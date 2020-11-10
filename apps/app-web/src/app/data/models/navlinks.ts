import { environment } from 'apps/app-web/src/environments/environment';

export let NavLinks:Link[] =
environment.production ? [
  {name: "INICIO",    href:"inicio"},
  {name: "SOBRE",     href:"empresa"},
  {name: "SERVICOS",  href:"servicos"},
  {name: "PRODUTOS",  href:"produtos"},
  {name: "CONTATO", href:"orcamento"},
] : [
  {name: "INICIO",    href:"inicio"},
  {name: "SOBRE",     href:"empresa"},
  {name: "SERVICOS",  href:"servicos"},
  {name: "PRODUTOS",  href:"produtos"},
  {name: "CONTATO", href:"orcamento"},
];


interface Link{
  name:string;
  href:string;
}
