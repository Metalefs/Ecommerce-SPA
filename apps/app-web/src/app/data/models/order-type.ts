import { StatusProduto } from 'libs/data/src/lib/classes/produto';

export interface OrderType{
  name:string;
  id:number;
}
export interface OrderStatus{
  name:string;
  id:StatusProduto;
}
