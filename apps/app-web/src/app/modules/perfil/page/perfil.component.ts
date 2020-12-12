import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'libs/data/src/lib/classes';
import { AuthenticationService } from '../../../core/service/authentication/authentication.service';

@Component({
  selector: 'personalizados-lopes-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  user:Usuario;
  enderecoFormGroup: FormGroup;
  constructor(private authenticationService: AuthenticationService,
    private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.authenticationService.currentUser.subscribe(x=>{
      this.user = x;
    })
    this.enderecoFormGroup = this._formBuilder.group({
      ruaCtrl: ['', Validators.required],
    });
  }

}
