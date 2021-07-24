import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Select } from '@ngxs/store';
import { cardFlip } from 'apps/app-web/src/app/animations';
import { AuthenticationService } from 'apps/app-web/src/app/core/service/authentication/authentication.service';
import { OrcamentoState } from 'apps/app-web/src/app/data/store/state';
import { Orcamento, Usuario } from 'libs/data/src/lib/classes';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { CheckoutService } from '../../checkout.service';

@Component({
  selector: 'personalizados-lopes-pagamento',
  templateUrl: './pagamento.component.html',
  styleUrls: ['./pagamento.component.scss'],
  animations: [cardFlip]
})
export class PagamentoComponent implements OnInit {
  _init_point:string;
  @Select(OrcamentoState.ObterOrcamentos) Orcamento$: Observable<Orcamento>;
  Orcamento: Orcamento;
  state = 'flipped';
  user: Usuario;
  Loading: boolean = false;

  constructor(
    public checkoutService: CheckoutService,
    private auth: AuthenticationService,
    private snack: MatSnackBar,
    ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.flip()
    }, 0);
  }
  ngOnDestroy() {
    this.flip()
  }

  flip() {
    if (this.state === "default") {
      this.state = "flipped";
    } else {
      this.state = "default";
    }
  }

  public async Checkout(){
    if(!this._init_point)
    this.GetInitPoint();

    this.auth.currentUser.subscribe(async usr=>{
      this.user = usr;
    })

    if(!this.user) {
      await this.cadastroTemporario();
      if(this.Orcamento.Usuario?.Email)
      this.snack.open("Um perfil foi criado para você. Verifique mais informações no email : "+ this.Orcamento.Usuario?.Email, "Fechar")
    }
  }

  private GetInitPoint() {
    this.Orcamento$.subscribe(orcamento => {
      this.Loading = true;
      this.checkoutService.goCheckout(orcamento).subscribe(result => {
        this._init_point = result;
        this.Loading = false;
      });
    });
  }

  async cadastroTemporario() {
    return new Promise((resolve,reject) =>{
        this.auth.tempSignup(this.Orcamento.Usuario)
        .pipe(first())
        .subscribe(
          data => {
            resolve(console.log(data));
          },
          error => {
            reject(this.snack.open('Erro ao cadastrar com senha temporária: ' + error, 'fechar', { duration: 5000 }))
        });
    })
  }
}
