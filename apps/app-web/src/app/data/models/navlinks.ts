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
  options?:NavLinkOptions[];
}

export interface NavLinkOptions{
  nome:string;
  link:string;
  queryParams:object;
}

export let NavLinks:NavLink[] =
environment.production ? [
  {name: "Sobre",     href:"empresa",  icon:'',group:GrupoNavLink.institucional},
  {name: "Serviços",  href:"servicos", icon:'',group:GrupoNavLink.institucional},
  {name: "Básicos",   href:"produtos", icon:'shopping_bag',group:GrupoNavLink.produtos},
  {name: "Orcamento",   href:"orcamento",icon:'mail', group:GrupoNavLink.duvidas},
  {name: "Blog",      href:"blog",     icon:'comment', group:GrupoNavLink.duvidas},
] : [
  {name: "Institucional", href:"", icon:'',group:GrupoNavLink.none},
  {name: "Sobre",     href:"empresa",  icon:'',group:GrupoNavLink.institucional},
  {name: "Serviços",  href:"servicos", icon:'',group:GrupoNavLink.institucional},
  {name: "Básicos",   href:"produtos", icon:'shopping_bag',group:GrupoNavLink.produtos},
  {name: "Orcamento",   href:"orcamento",icon:'mail', group:GrupoNavLink.duvidas},
  {name: "Blog",      href:"blog",     icon:'comment', group:GrupoNavLink.duvidas},
];


export let NavLinksRes:NavLink[] =
environment.production ? [
  {
    name: "Institucional", href:"", icon:'home',group:GrupoNavLink.none,
    options:[
      {nome:"Inicio",link:`/inicio`,queryParams:{}},
      {nome:"Sobre",link:`/empresa`,queryParams:{}},
      {nome:"Serviços",link:`/servicos`,queryParams:{}},
      {nome:"Galeria",link:`/showcase`,queryParams:{}},
    ]
  },
  {name: "Básicos",   href:"produtos", icon:'',group:GrupoNavLink.produtos},
  {name: "Orcamento",   href:"orcamento",icon:'', group:GrupoNavLink.duvidas},
  {name: "Blog",      href:"blog",     icon:'', group:GrupoNavLink.duvidas},
] : [
  {
    name: "Institucional", href:"", icon:'',group:GrupoNavLink.none,
    options:[
      {nome:"Inicio",link:`/inicio`,queryParams:{}},
      {nome:"Sobre",link:`/empresa`,queryParams:{}},
      {nome:"Serviços",link:`/servicos`,queryParams:{}},
    ]
  },
  {name: "Básicos",   href:"produtos", icon:'',group:GrupoNavLink.produtos},
  {name: "Orcamento",   href:"orcamento",icon:'', group:GrupoNavLink.duvidas},
  {name: "Blog",      href:"blog",     icon:'', group:GrupoNavLink.duvidas},
];
