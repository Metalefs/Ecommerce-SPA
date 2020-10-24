import { environment } from 'apps/app-web/src/environments/environment';

export let NavLinks:Link[] =
environment.production ? [
  {name: "inicio",    href:"inicio"},
  {name: "sobre",     href:"empresa"},
  {name: "produtos",  href:"produtos"},
  {name: "serviços",  href:"servicos"},
  {name: "orcamentos", href:"orcamento"},
] : [
  {name: "inicio",    href:"inicio"},
  {name: "sobre",     href:"empresa"},
  {name: "produtos",  href:"produtos"},
  {name: "serviços",  href:"servicos"},
  {name: "orcamentos", href:"orcamento"},
];


interface Link{
  name:string;
  href:string;
}
