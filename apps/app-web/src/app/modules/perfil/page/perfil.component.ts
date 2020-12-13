import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Usuario } from 'libs/data/src/lib/classes';
import { AuthenticationService } from '../../../core/service/authentication/authentication.service';
import { UsuarioService } from '../../../data/service';

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
    private _formBuilder: FormBuilder) { }

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
    });
  }

}
