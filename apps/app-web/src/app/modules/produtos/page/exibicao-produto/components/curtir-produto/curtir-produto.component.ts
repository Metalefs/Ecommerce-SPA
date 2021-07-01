import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { GostarProduto } from 'apps/app-web/src/app/data/store/actions/produto.actions';
import { Produto } from 'libs/data/src/lib/classes';

@Component({
  selector: 'personalizados-lopes-curtir-produto',
  templateUrl: './curtir-produto.component.html',
  styleUrls: ['./curtir-produto.component.scss']
})
export class CurtirProdutoComponent implements OnInit {
  @Input() Produto:Produto;

  @Input() Liked:boolean = false;
  loading:boolean = false;
  constructor(
    private store: Store) { }

  ngOnInit(): void {
    setTimeout(()=>{
      if(this.Produto)
      this.Liked = localStorage.getItem(`heartproduto${this.Produto._id}`) == 'true' ? true: false;
    },2000)
  }
  Like(){
    if(!localStorage.getItem(`heartproduto${this.Produto._id}`)){
      this.loading = true;
      this.store.dispatch(new GostarProduto(this.Produto._id)).subscribe(x=>{
        this.Liked = true;
        localStorage.setItem(`heartproduto${this.Produto._id}`,'true');
      });
      setTimeout(()=>{
        this.Liked = true;
        localStorage.setItem(`heartproduto${this.Produto._id}`,'true');
        this.Produto.Likes++;
        this.loading = false;
      },3000)
    }
    else
      return
  }
}
