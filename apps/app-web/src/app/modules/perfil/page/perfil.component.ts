import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EnderecoEntrega, Usuario } from 'libs/data/src/lib/classes';
import { AuthenticationService } from '../../../core/service/authentication/authentication.service';
import { UsuarioService } from '../../../data/service';
import { NovoEnderecoComponent } from './dialogs/novo-endereco/novo-endereco.component';

@Component({
  selector: 'personalizados-lopes-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  user:Usuario;
  enderecoFormGroup: FormGroup;
  constructor(private authenticationService: AuthenticationService,
    private usuarioService: UsuarioService,
    private snack: MatSnackBar,
    private _formBuilder: FormBuilder,
    private dialog :MatDialog) { }

  ngOnInit(): void {
    this.authenticationService.currentUser.subscribe(x=>{
      this.user = x;
    })
    this.enderecoFormGroup = this._formBuilder.group({
      ruaCtrl: ['', Validators.required],
    });
  }

  AtualizarInformacoes(){
    this.usuarioService.AtualizarInformacoes(this.user).subscribe(x=>{
      this.snack.open('Informações atualizadas','Fechar');
      this.authenticationService.setUser(x);
    });
  }

  NovoEndereco(){
    this.dialog.open(NovoEnderecoComponent, {
      width:"512px",
      height:"100vh",
      position:{
        left:"0"
      }
    });
  }

  RemoverEndereco(idx:number){
    this.user.EnderecosEntrega.splice(idx,1);
    this.AtualizarInformacoes();
  }

  SetarEndereco(idx:number){
    this.user.EnderecoEntrega = this.user.EnderecosEntrega[idx];
    this.AtualizarInformacoes();
  }

}
