import { IfStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Servico } from 'libs/data/src/lib/classes';
import { Observable, Subscription } from 'rxjs';
import { async } from 'rxjs/internal/scheduler/async';
import { tap } from 'rxjs/operators';
import { SobreCard } from '../../../data/models';
import { LerServico } from '../../../data/store/actions/Servico.actions';
import { ServicoState } from '../../../data/store/state';
import { removeDuplicates } from '../../../helper/ObjHelper';

@Component({
  selector: 'personalizados-lopes-servico',
  templateUrl: './servico.component.html',
  styleUrls: ['./servico.component.scss']
})
export class ServicoComponent implements OnInit {

  Cards : SobreCard[] = [

  ];
  @Select(ServicoState.ObterServico) Servico$: Observable<Servico[]>;

  @Select(ServicoState.IsServicoLoaded) IsServicoLoaded$;

  IsServicoLoadedSub: Subscription;

  constructor(private store: Store ) {

  }

  LerServicosCarregados(){
    this.Servico$.subscribe(x=>{
      console.log(x);
      x.forEach(servico =>{

        let classe = servico.Categoria.Nome == "Serigrafia" ? "left" : "right";
        this.Cards.push(
          {
            title:servico.Nome,
            icon:"group_work",
            color:"#FD6D13",
            class:classe,
            link:"/produto/"+servico.Categoria,
            content:servico.Descricao
          }
        );
        this.Cards = removeDuplicates(this.Cards,"title")
      })
    })
  }

  ngOnInit(): void {
    this.LerServicosCarregados();
  }

}
