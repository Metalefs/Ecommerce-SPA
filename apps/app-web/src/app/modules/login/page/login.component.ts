import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTabGroup } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { Usuario } from 'libs/data/src/lib/classes';
import { TipoUsuario } from 'libs/data/src/lib/enums';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../../../core/service/authentication/authentication.service';

@Component({
  selector: 'personalizados-lopes-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  emailPattern = new RegExp("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$");
  usuario:Usuario;
  Cadastro_Form = new Cadastro_Form("",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    ""
    );
    @ViewChild('tabs',{static: false}) tabGroup: MatTabGroup;
  constructor(private authenticationService: AuthenticationService,
    private router: Router) { }
  Logado:boolean;
  selected = new FormControl(0); // define a FormControl with value 0. Value means index.
  ngOnInit(): void {
    this.authenticationService.currentUser.subscribe(x=>{
      this.usuario = x;
      this.Logado = x != undefined
      this.changeTab(this.Logado ? 1 : 0);
    })
  }
  ngAfterContentInit(){
    this.changeTab(this.Logado ? 1 : 0);
  }
  changeTab(tab) {
    this.selected.setValue(tab);
  }
  Cadastro() {
    this.loading = true;
    console.log(this.Cadastro_Form);
    let cliente = new Usuario(
      this.Cadastro_Form.Nome,
      this.Cadastro_Form.Email,
      this.Cadastro_Form.Telefone,
      this.Cadastro_Form.Senha,
      this.Cadastro_Form.Rua,
      this.Cadastro_Form.Bairro,
      this.Cadastro_Form.Numero,
      "", //CIDADE
      "", //COMPLEMENTO
      "", //CEP
      "", //ESTADO
      TipoUsuario.normal
    );
    this.authenticationService.signup(cliente)
        .pipe(first())
        .subscribe(
            data => {
                this.router.navigate([this.returnUrl]);
            },
            error => {
                this.error = error;
                this.loading = false;
            });
  }
}
class Cadastro_Form {
  Email:string;
  Nome:string;
  Telefone:string = "";
  Senha:string;
  Rua:string = "";
  Bairro:string = "";
  Numero:string = "";
  Cidade:string = "";
  Estado:string = "";
  constructor(
    Email:string,
    Nome:string,
    Telefone:string,
    Senha:string,
    Rua:string,
    Bairro:string,
    Numero:string,
    Cidade:string,
    Estado:string
  ){
    this.Email = Email;
    this.Nome = Nome;
    this.Telefone = Telefone;
    this.Senha = Senha;
    this.Rua = Rua;
    this.Bairro = Bairro;
    this.Numero = Numero;
    this.Cidade = Cidade;
    this.Estado = Estado;
  }
}
