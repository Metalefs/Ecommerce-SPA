import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Select, Store } from '@ngxs/store';
import { entities } from '@personalizados-lopes/data';
import { EditarCarousel } from 'apps/app-web/src/app/data/store/actions/carousel.actions';
import { CarouselState } from 'apps/app-web/src/app/data/store/state';
import { Carousel } from 'libs/data/src/lib/classes';
import { Observable } from 'rxjs';
import { EditarCarouselDialogComponent } from './dialogComponents/editar-carousel-dialog/editar-carousel-dialog.component';

@Component({
  selector: 'personalizados-lopes-editar-carousel',
  templateUrl: './editar-carousel.component.html',
  styleUrls: ['./editar-carousel.component.scss']
})
export class EditarCarouselComponent implements OnInit {
  @Select(CarouselState.ObterCarousel) Carrosel$: Observable<Carousel>;
  constructor( private store:Store,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  EditarPropriedadesCarrosel(){
    this.Carrosel$.subscribe(x=>{

      const dialogRef = this.dialog.open(EditarCarouselDialogComponent, {
        width: '90%',
        data: x
      });

      dialogRef.afterClosed().subscribe((result :Carousel) => {
        if(result == undefined)
        return;
        this.store.dispatch(new EditarCarousel(result,result._id))
      });
    })
  }

}
