import { environment } from 'apps/app-web/src/environments/environment';

export enum GrupoNavLink{
  institucional,
  produtos,
  duvidas,
  none
}

export interface NavLink{
  name:string;
  href:string;
  icon?:string;
  group?:GrupoNavLink;
}

export let NavLinks:NavLink[] =
environment.production ? [
  {name: "INICIO",    href:"inicio",    icon:'',group:GrupoNavLink.none},
  {name: "SOBRE",     href:"empresa",   icon:'',group:GrupoNavLink.institucional},
  {name: "SERVIÇOS",  href:"servicos",  icon:'',group:GrupoNavLink.institucional},
  {name: "BASICOS",   href:"produtos",  icon:'store',group:GrupoNavLink.produtos},
  {name: "CONTATO",   href:"orcamento", icon:'perm_phone_msg', group:GrupoNavLink.duvidas},
] : [
  {name: "INICIO",    href:"inicio",   icon:'',group:GrupoNavLink.none},
  {name: "SOBRE",     href:"empresa",  icon:'',group:GrupoNavLink.institucional},
  {name: "SERVIÇOS",  href:"servicos", icon:'',group:GrupoNavLink.institucional},
  {name: "BASICOS",   href:"produtos", icon:'store',group:GrupoNavLink.produtos},
  {name: "CONTATO",   href:"orcamento",icon:'perm_phone_msg', group:GrupoNavLink.duvidas},
];


