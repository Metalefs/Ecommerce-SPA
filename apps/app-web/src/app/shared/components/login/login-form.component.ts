import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// import custom validator to validate that password and confirm password fields match
import { AuthenticationService } from '../../../core/service/authentication/authentication.service';
import { CadastroService } from '../../../core/service/cadastro.service';
import { entities } from '@personalizados-lopes/data';
import { InformacoesContatoService } from '../../../data/service/InformacoesContatoService';
import { Usuario } from 'libs/data/src/lib/classes';
import { Store } from '@ngxs/store';

class Login_Form {
  Email:string;
  Senha:string;
}
@Component({
  selector: 'personalizados-lopes-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  iserror = false;
  emailPattern = new RegExp("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$");
  registerForm: FormGroup;

  @Input()
  InformacoesContato:entities.InformacoesContato = null;

  form = new Login_Form();
  Logado:boolean;
  EmailError:boolean;
  PassError:boolean;
  usuario:Usuario;
  @Input()
  Cadastrar:Boolean;
  constructor(
    private infocontatoservice: InformacoesContatoService,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private CadastroService: CadastroService,
    private formBuilder: FormBuilder,
    )
    {
        this.authenticationService.currentUser.subscribe(x =>console.log(x));
    }

  SetCadastrar(val){
    this.CadastroService.setCadastrar(val);
    this.Cadastrar = val;
  }

  Login() {
    this.loading = true;

    this.authenticationService.login(this.form.Email, this.form.Senha)
        .pipe(first())
        .subscribe(
            data => {
                this.EmailError = false;
                this.PassError = false;
                this.error = null;
                this.Logado = true;

                this.router.navigate([this.returnUrl]);
            },
            error => {
                console.log(error);
                this.error = error;
                this.iserror = true;
                this.loading = false;
            },
        );
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.authenticationService.currentUser.subscribe(x=>{
      this.usuario = x;
      this.Logado = x != undefined
    })
    this.registerForm = this.formBuilder.group({
      Email: ['', [Validators.required, Validators.email]],
      Senha: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }

  Logout(){
    this.authenticationService.logout();
  }
  EsqueceuSenha(){
    this.authenticationService.changePassword(this.form.Email).subscribe(x=>{
      console.log(x);
    });
  }
}
