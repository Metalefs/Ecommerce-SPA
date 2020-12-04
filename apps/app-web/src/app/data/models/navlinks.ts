import { environment } from 'apps/app-web/src/environments/environment';

export let NavLinks:Link[] =
environment.production ? [
  {name: "INICIO",    href:"inicio"},
  {name: "SOBRE",     href:"empresa"},
  {name: "SERVICOS",  href:"servicos"},
  {name: "PRODUTOS",  href:"produtos",icon:'shop'},
  {name: "CONTATO",   href:"orcamento",icon:'contacts'},
] : [
  {name: "INICIO",    href:"inicio"},
  {name: "SOBRE",     href:"empresa"},
  {name: "SERVICOS",  href:"servicos"},
  {name: "PRODUTOS",  href:"produtos",icon:'shop'},
  {name: "CONTATO",   href:"orcamento",icon:'contacts'},
];


interface Link{
  name:string;
  href:string;
  icon?:string;
}
