import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngxs/store';
import { Estampa, Imagem } from 'libs/data/src/lib/classes';
import { EditarEstampaDialogComponent } from './dialogs/editar-estampa-dialog/editar-estampa-dialog.component';
import { EditarEstampaService } from './editar-estampa.service';

@Component({
  selector: 'personalizados-lopes-editar-estampa',
  templateUrl: './editar-estampa.component.html',
  styleUrls: ['./editar-estampa.component.scss']
})
export class EditarEstampaComponent implements OnInit {

  @Input() Estampa:Estampa = new Estampa("","",[new Imagem("","","")],0,"",0,false);
  Estampas:Estampa[] = [];
  EstampasSelecionadas:Estampa[] = [];
  constructor(
    protected store: Store,
    protected dialog: MatDialog,
    protected snackBar: MatSnackBar,
    protected estampaService: EditarEstampaService) { }

  ngOnInit(): void {
    this.Atualizar();
  }

  async Editar(estampa) {
    const dialogRef = this.dialog.open(EditarEstampaDialogComponent, {
      width: "100%",
      height: "100%",
      data: estampa[0],
      panelClass:['fullscreen-modal']
    });
    dialogRef.afterClosed().subscribe(async (estampa : Estampa) => {
      console.log(estampa)
      if(estampa != undefined){
        await (await this.estampaService.EditarEstampa(estampa)).subscribe(result=>{
          this.snackBar.open("Estampa editada com sucesso", "Fechar", {verticalPosition:"top"});
          this.Atualizar();
        })
      }
    });
  }

  async Remover(estampas) {
   estampas.forEach(async(estampa)=>{
    let confirmar = confirm("Remover estampa?");
    if(confirmar)
    (await this.estampaService.RemoverEstampa(estampa)).subscribe(result=>{
        this.snackBar.open("Estampa removida com sucesso", "Fechar", {verticalPosition:"top"});
        this.Atualizar();
      })
   })
  }

  Atualizar(){
    this.estampaService.Ler().subscribe(estampas => this.Estampas = estampas as any as Estampa[]);
  }
}
