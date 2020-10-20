import { environment } from 'apps/app-web/src/environments/environment';

export let NavLinks:Link[] =
environment.production ? [
  {name: "INICIO",    href:"inicio"},
  {name: "SOBRE",     href:"empresa"},
  {name: "PRODUTOS",  href:"produtos"},
  {name: "SERVIÇOS",  href:"servicos"},
  {name: "ORÇAMENTO", href:"orcamento"},
] : [
  {name: "INICIO",    href:"inicio"},
  {name: "SOBRE",     href:"empresa"},
  {name: "PRODUTOS",  href:"produtos"},
  {name: "SERVIÇOS",  href:"servicos"},
  {name: "ORÇAMENTO", href:"orcamento"},
];


interface Link{
  name:string;
  href:string;
}
