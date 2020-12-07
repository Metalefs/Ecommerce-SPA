import { environment } from 'apps/app-web/src/environments/environment';


interface Link{
  name:string;
  href:string;
  icon?:string;
  group?:GrupoNavLink;
}

enum GrupoNavLink{
  institucional,
  produtos,
  duvidas
}

export let NavLinks:Link[] =
environment.production ? [
  {name: "INICIO",    href:"inicio"},
  {name: "SOBRE",     href:"empresa", group:GrupoNavLink.institucional},
  {name: "SERVIÇOS",  href:"servicos", group:GrupoNavLink.institucional},
  {name: "PRODUTOS",  href:"produtos",icon:'shop', group:GrupoNavLink.produtos},
  {name: "CONTATO",   href:"orcamento",icon:'contacts', group:GrupoNavLink.duvidas},
] : [
  {name: "INICIO",    href:"inicio"},
  {name: "SOBRE",     href:"empresa", group:GrupoNavLink.institucional},
  {name: "SERVIÇOS",  href:"servicos", group:GrupoNavLink.institucional},
  {name: "PRODUTOS",  href:"produtos",icon:'shop', group:GrupoNavLink.produtos},
  {name: "CONTATO",   href:"orcamento",icon:'contacts', group:GrupoNavLink.duvidas},
];


