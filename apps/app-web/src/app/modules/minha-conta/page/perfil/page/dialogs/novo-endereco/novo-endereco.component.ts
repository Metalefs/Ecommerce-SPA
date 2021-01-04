import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Select, Store } from '@ngxs/store';
import { AuthenticationService } from 'apps/app-web/src/app/core/service/authentication/authentication.service';
import { Estado } from 'apps/app-web/src/app/data/models';
import { CEPService, EstadoService, UsuarioService } from 'apps/app-web/src/app/data/service';
import { EnderecoEntrega, Orcamento, Usuario } from 'libs/data/src/lib/classes';

@Component({
  selector: 'personalizados-lopes-novo-endereco',
  templateUrl: './novo-endereco.component.html',
  styleUrls: ['./novo-endereco.component.scss']
})
export class NovoEnderecoComponent implements OnInit {

  registerForm: FormGroup;
  state='flipped';
  cepFormControl = new FormControl('', [
    Validators.required
  ]);

  enderecoFormControl = new FormControl('', [
    Validators.required,
  ]);

  numeroFormControl = new FormControl('', [
    Validators.required,
  ]);

  bairroFormControl = new FormControl('', [
    Validators.required
  ]);

  cidadeFormControl = new FormControl('', [
    Validators.required
  ]);

  complementoFormControl = new FormControl('', [

  ]);

  estadoFormControl = new FormControl('', [
    Validators.required
  ]);
  Finalizado:boolean = false;
  Loading:boolean = false;

  ErroCadastro:boolean = false;
  estados: Estado[];
  Usuario:Usuario;

  EndForm:EndForm = {
    EnderecoEntrega:new EnderecoEntrega("","","","","","",""),
  };

  constructor(private store:Store,
    private CEPService:CEPService,
    private EstadoService:EstadoService,
    private snack: MatSnackBar,
    private usuarioService: UsuarioService,
    private authService:AuthenticationService
    ) { }

  ngOnInit(): void {
    this.authService.currentUser.subscribe(x=>{
      this.Usuario =x;
    })
    this.EstadoService.Listar().subscribe(x=>{
      this.estados = x;
    })
    setTimeout(()=>{
      this.flip()
    },0)
  }

  ngOnDestroy(){
    this.flip()
  }

  flip(){
    if (this.state === "default") {
      this.state = "flipped";
    } else {
      this.state = "default";
    }
  }

  CarregarDetalhesCEP(){
    this.CEPService.ObterDetalhes(this.Usuario.EnderecoEntrega.CEP.replace('-','')).subscribe(x=>{
      this.EndForm.EnderecoEntrega.Rua = x.logradouro;
      this.EndForm.EnderecoEntrega.Bairro = x.bairro;
      this.EndForm.EnderecoEntrega.Cidade = x.localidade;
      this.EndForm.EnderecoEntrega.Estado = x.uf;
    });
  }

  Finalizar(){
    this.ErroCadastro = true;
    if(this.ValidarDados()){
      this.ErroCadastro = false;
      this.Loading = true;
      this.TentativaPopularEnderecosEntregaUsuario();

      this.Usuario.EnderecosEntrega.push(new EnderecoEntrega(
        this.enderecoFormControl.value,
        this.numeroFormControl.value,
        this.bairroFormControl.value,
        this.cidadeFormControl.value,
        this.complementoFormControl.value,
        this.cepFormControl.value,
        this.estadoFormControl.value,
      ))

      this.usuarioService.AtualizarInformacoes(this.Usuario).subscribe((x:Usuario)=>{
        this.Finalizado = true;

        this.snack.open("Endereço adicionado", "Fechar", {
          verticalPosition:'top',
          horizontalPosition:'left'
        });
        this.authService.setUser(x);
        this.Loading = false;
      });
    }
  }

  TentativaPopularEnderecosEntregaUsuario(){
    if(this.Usuario.EnderecosEntrega == [] || !this.Usuario.EnderecosEntrega){
      if(this.Usuario.EnderecoEntrega)
      this.Usuario.EnderecosEntrega = [this.Usuario.EnderecoEntrega];
    }
  }

  ValidarDados(){
    if( this.cepFormControl.valid &&
      this.enderecoFormControl.valid &&
      this.numeroFormControl.valid &&
      this.bairroFormControl.valid &&
      this.cidadeFormControl.valid &&
      this.estadoFormControl.valid)
      return true;
    return false;
  }

}
interface EndForm {
  EnderecoEntrega : EnderecoEntrega;
}
