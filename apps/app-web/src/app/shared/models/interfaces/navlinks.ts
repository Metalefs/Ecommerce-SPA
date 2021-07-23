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
  Picon?:string;
  Micon?:string;
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
  {name: "Inicio", href:"", icon:'about',group:GrupoNavLink.none},
  {name: "Inicio",     href:"/",  icon:'home',group:GrupoNavLink.institucional},
  {name: "Empresa",     href:"empresa",  icon:'business',group:GrupoNavLink.institucional},
  {name: "Serviços",  href:"servicos", icon:'work',group:GrupoNavLink.institucional},
  {name: "Loja",   href:"produtos", icon:'shopping_bag',group:GrupoNavLink.produtos},
  {name: "Contato",   href:"orcamento",icon:'mail', group:GrupoNavLink.duvidas},
  {name: "Notícias",      href:"blog",     icon:'comment', group:GrupoNavLink.duvidas},
] : [
  {name: "Inicio", href:"", icon:'about',group:GrupoNavLink.none},
  {name: "Inicio",     href:"/",  icon:'home',group:GrupoNavLink.institucional},
  {name: "Empresa",     href:"empresa",  icon:'business',group:GrupoNavLink.institucional},
  {name: "Serviços",  href:"servicos", icon:'work',group:GrupoNavLink.institucional},
  {name: "Loja",   href:"produtos", icon:'shopping_bag',group:GrupoNavLink.produtos},
  {name: "Contato",   href:"orcamento",icon:'mail', group:GrupoNavLink.duvidas},
  {name: "Notícias",      href:"blog",     icon:'comment', group:GrupoNavLink.duvidas},
];


export let NavLinksRes:NavLink[] =
environment.production ? [
  {
    name: "Home", href:"/inicio", icon:'home', Picon:"pi pi-home", group:GrupoNavLink.none,
    options:[
      // {nome:"Inicio",link:`/inicio`,queryParams:{}},
      {nome:"Empresa",link:`/empresa`,queryParams:{}},
      {nome:"Serviços",link:`/servicos`,queryParams:{}},
      {nome:"Galeria",link:`/showcase`,queryParams:{}},
    ]
  },
  {name: "Loja",   href:"./produtos", Picon:"pi pi-shopping-cart", group:GrupoNavLink.produtos},
  {name: "Contato",   href:"./orcamento", Picon:'pi pi-envelope', group:GrupoNavLink.duvidas},
  {name: "Notícias",      href:"./blog",     Picon:'pi pi-comment', group:GrupoNavLink.duvidas},
] : [
  {
    name: "Home", href:"/inicio", icon:'home', Picon:"", group:GrupoNavLink.none,
    options:[
      // {nome:"Inicio",link:`/inicio`,queryParams:{}},
      {nome:"Empresa",link:`/empresa`,queryParams:{}},
      {nome:"Serviços",link:`/servicos`,queryParams:{}},
      {nome:"Galeria",link:`/showcase`,queryParams:{}},
    ]
  },
  {name: "Loja",   href:"./produtos", Picon:"", group:GrupoNavLink.produtos},
  {name: "Contato",   href:"./orcamento", Picon:'pi pi-envelope', group:GrupoNavLink.duvidas},
  {name: "Notícias",      href:"./blog",     Picon:'pi pi-comment', group:GrupoNavLink.duvidas},
];
