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
  {name: "INICIO",    href:"inicio",   icon:'',group:GrupoNavLink.none},
  {name: "Sobre",     href:"empresa",  icon:'',group:GrupoNavLink.institucional},
  {name: "Serviços",  href:"servicos", icon:'',group:GrupoNavLink.institucional},
  {name: "Básicos",   href:"produtos", icon:'store',group:GrupoNavLink.produtos},
  {name: "Contato",   href:"orcamento",icon:'perm_phone_msg', group:GrupoNavLink.duvidas},
] : [
  {name: "INICIO",    href:"inicio",   icon:'',group:GrupoNavLink.none},
  {name: "Sobre",     href:"empresa",  icon:'',group:GrupoNavLink.institucional},
  {name: "Serviços",  href:"servicos", icon:'',group:GrupoNavLink.institucional},
  {name: "Básicos",   href:"produtos", icon:'store',group:GrupoNavLink.produtos},
  {name: "Contato",   href:"orcamento",icon:'perm_phone_msg', group:GrupoNavLink.duvidas},
];


export let NavLinksRes:NavLink[] =
environment.production ? [
  {name: "Básicos",   href:"produtos", icon:'store',group:GrupoNavLink.produtos},
  {name: "Contato",   href:"orcamento",icon:'perm_phone_msg', group:GrupoNavLink.duvidas},
] : [
  {name: "Básicos",   href:"produtos", icon:'store',group:GrupoNavLink.produtos},
  {name: "Contato",   href:"orcamento",icon:'perm_phone_msg', group:GrupoNavLink.duvidas},
];
