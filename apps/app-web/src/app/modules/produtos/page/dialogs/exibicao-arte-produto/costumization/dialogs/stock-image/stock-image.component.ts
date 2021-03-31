import { Component, Inject, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'personalizados-lopes-stock-image',
  templateUrl: './stock-image.component.html',
  styleUrls: ['./stock-image.component.scss']
})
export class StockImageComponent implements OnInit {

  imgSrc = [
    {
      img: "https://unsplash.it/400/500?random",
      name: "Item 1",
      price: "R$4.00"
    },
    {
      img: "https://unsplash.it/500/500?random",
      name: "Item 2",
      price: "R$4.00"
    },
    {
      img: "https://unsplash.it/500/400?random",
      name: "Item 3",
      price: "R$4.00"
    },
    {
      img: "https://unsplash.it/500/300?random",
      name: "Item 4",
      price: "R$3.00"
    }];
  girlSrc = [
    {
      img: "https://drawinghowtos.com/wp-content/uploads/2019/11/unicorn-colored.png",
      name: "Unicornio",
      price: "R$5.00"
    },
    {
      img: "https://i.pinimg.com/originals/69/64/94/69649494d972df188fbbd2f15988419c.png",
      name: "Borboleta",
      price: "R$2.00"
    },
    {
      img: "https://dbdzm869oupei.cloudfront.net/img/sticker/preview/12597.png",
      name: "Flor de cerejeira",
      price: "RS5.00"
    }];
  illuSrc = [
    {
      img: "https://isometric.online/wp-content/uploads/2020/05/people_svg.svg",
      name: "People",
      price: "R$5.00"
    },
    {
      img: "https://isometric.online/wp-content/uploads/2020/04/fitness_svg.svg",
      name: "Fitness",
      price: "R$5.00"
    },
    {
      img: "https://isometric.online/wp-content/uploads/2020/04/instagram_svg.svg",
      name: "Instagram",
      price: "R$4.00"
    },
    {
      img: "https://isometric.online/wp-content/uploads/2020/04/tv_svg.svg",
      name: "Televisão",
      price: "R$3.00"
    }];

  list:any=[];
  constructor(public dialogRef: MatDialogRef<StockImageComponent>,
    @Inject(MAT_DIALOG_DATA) public data:  any) {
    }

  ngOnInit(): void {
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
