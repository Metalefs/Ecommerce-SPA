import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { entities } from '@personalizados-lopes/data';
import { LerCliente, AdicionarCliente } from 'apps/app-web/src/app/data/store/actions/cliente.actions';
import { ClienteState } from 'apps/app-web/src/app/data/store/state';

@Component({
  selector: 'personalizados-lopes-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {
  @Select(ClienteState.ObterListaClientes) Clientes$: Observable<entities.Cliente[]>;
  @Select(ClienteState.areClientesLoaded) areClientesLoaded$;
  areClientesLoadedSub: Subscription;
  constructor( private store: Store ) { }
  CarregarClientes(){
    this.areClientesLoadedSub = this.areClientesLoaded$.pipe(
      tap((areClientesLoaded) => {
          console.log(this.store.dispatch(new LerCliente()));
          console.log(this.Clientes$)
      })
    ).subscribe(value => {
      console.log(value);
    });
  }
  ngOnInit(): void {
    this.CarregarClientes();
  }
  data = [{
    imgUrl: 'assets/images/man.png',
    userName: 'blabla1111111111111111',
    text: 'I rely on my monthly rental income to help fund my retirement and this will help protect my nest egg'
  }, {
    imgUrl: 'assets/images/man.png',
    userName: 'blabla',
    text: 'I rely on my monthly rental income to help fund my retirement and this will help protect my nest egg'
  }, {
    imgUrl: 'assets/images/man.png',
    userName: 'blabla',
    text: 'I rely on my monthly rental income to help fund my retirement and this will help protect my nest egg'
  }, {
    imgUrl: 'assets/images/man.png',
    userName: 'blabla',
    text: 'I rely on my monthly rental income to help fund my retirement and this will help protect my nest egg'
  }, {
    imgUrl: 'assets/images/man.png',
    userName: 'blabla',
    text: 'I rely on my monthly rental income to help fund my retirement and this will help protect my nest egg'
  }, {
    imgUrl: 'assets/images/man.png',
    userName: 'blabla',
    text: 'I rely on my monthly rental income to help fund my retirement and this will help protect my nest egg'
  }, {
    imgUrl: 'assets/images/man.png',
    userName: 'blabla',
    text: 'I rely on my monthly rental income to help fund my retirement and this will help protect my nest egg'
  }, {
    imgUrl: 'assets/images/man.png',
    userName: 'blabla',
    text: 'I rely on my monthly rental income to help fund my retirement and this will help protect my nest egg'
  }, {
    imgUrl: 'assets/images/man.png',
    userName: 'blabla',
    text: 'I rely on my monthly rental income to help fund my retirement and this will help protect my nest egg'
  }, {
    imgUrl: 'assets/images/man.png',
    userName: 'blabla2222222222222222',
    text: 'I rely on my monthly rental income to help fund my retirement and this will help protect my nest egg'
  }];
}
