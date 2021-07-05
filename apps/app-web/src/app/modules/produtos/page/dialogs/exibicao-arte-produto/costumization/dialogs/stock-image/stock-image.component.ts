import { Component, Inject, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EstampaService } from 'apps/app-web/src/app/data/service';
import { Estampa } from 'libs/data/src/lib/classes';

@Component({
  selector: 'personalizados-lopes-stock-image',
  templateUrl: './stock-image.component.html',
  styleUrls: ['./stock-image.component.scss']
})
export class StockImageComponent implements OnInit {

  imgSrc:Array<Estampa> = []
  // girlSrc:Array<Estampa> = [
  //   {
  //     Imagem: "https://drawinghowtos.com/wp-content/uploads/2019/11/unicorn-colored.png",
  //     name: "Unicornio",
  //     price: "GRÁTIS"
  //   },
  //   {
  //     img: "https://i.pinimg.com/originals/69/64/94/69649494d972df188fbbd2f15988419c.png",
  //     name: "Borboleta",
  //     price: "GRÁTIS"
  //   },
  //   {
  //     img: "https://dbdzm869oupei.cloudfront.net/img/sticker/preview/12597.png",
  //     name: "Flor de cerejeira",
  //     price: "GRÁTIS"
  // }];
  // illuSrc:Array<Estampa> = [
  //   {
  //     img: "https://isometric.online/wp-content/uploads/2020/05/people_svg.svg",
  //     name: "People",
  //     price: "GRÁTIS"
  //   },
  //   {
  //     img: "https://isometric.online/wp-content/uploads/2020/04/fitness_svg.svg",
  //     name: "Fitness",
  //     price: "GRÁTIS"
  //   },
  //   {
  //     img: "https://isometric.online/wp-content/uploads/2020/04/instagram_svg.svg",
  //     name: "Instagram",
  //     price: "GRÁTIS"
  //   },
  //   {
  //     img: "https://isometric.online/wp-content/uploads/2020/04/tv_svg.svg",
  //     name: "Televisão",
  //     price: "GRÁTIS"
  // }];

  list:any=[];
  IdCategoria:string;
  constructor(public dialogRef: MatDialogRef<StockImageComponent>,
    private estampaService:EstampaService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.IdCategoria = data.IdCategoria;
    }

  ngOnInit(): void {
    this.estampaService.FiltrarPorIdCategoria(this.IdCategoria).subscribe(estampas=>{
      estampas.forEach(estampa=>{
        this.imgSrc.push(estampa);
      })
    })
    this.changeImgSrc(this.imgSrc)
  }
  changeImgSrc(src) {
    this.list = src;
  }
  addStockImg(e){
    this.close(e);
  }
  close(event){
    this.dialogRef.close(event);
  }
}
