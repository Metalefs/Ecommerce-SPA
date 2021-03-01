import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthenticationService } from 'apps/app-web/src/app/core/service/authentication/authentication.service';
import { UsuarioService } from 'apps/app-web/src/app/data/service';
import { Usuario } from 'libs/data/src/lib/classes';
import { TrocaSenha } from 'libs/data/src/lib/interfaces';

@Component({
  selector: 'personalizados-lopes-nova-senha',
  templateUrl: './nova-senha.component.html',
  styleUrls: ['./nova-senha.component.scss']
})
export class NovaSenhaComponent implements OnInit {
  senhaAtualFormControl = new FormControl('', [
    Validators.required
  ]);

  senhaNovaFormControl = new FormControl('', [
    Validators.required,
  ]);
  Finalizado:boolean = false;
  Loading:boolean = false;
  constructor(private snack: MatSnackBar,
    private usuarioService: UsuarioService,
    private authService:AuthenticationService) { }

  ngOnInit(): void {
  }
  Finalizar(){
    if(this.ValidarDados()){
      this.Loading = true;
      let trocarSenha:TrocaSenha = {senhaAtual: this.senhaAtualFormControl.value, senhaNova: this.senhaNovaFormControl.value};
      this.usuarioService.TrocarSenha(trocarSenha).subscribe((x:any) =>{
        this.Finalizado = true;
        this.snack.open("Senha alterada", "Fechar", {
          verticalPosition:'top',
          horizontalPosition:'left',
          duration:3000
        });
        console.log(x)
        if(x.Nome)
          this.authService.setUser(x);
        else
          this.snack.open(x.erro,"Fechar", {
            verticalPosition:'top',
            horizontalPosition:'left',
            duration:5000
          });
        this.Loading = false;
      });
    }
  }
  ValidarDados(){
    if( this.senhaAtualFormControl.valid &&
      this.senhaNovaFormControl.valid
      )
      return true;
    return false;
  }
}
