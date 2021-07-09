import { Injectable } from '@angular/core';
import { AngularFireDatabase} from '@angular/fire/database';
import { FireBaseService } from '../base/firebase.service';

@Injectable({
  providedIn: 'root'
})
export class ComentarioProdutoService extends FireBaseService{

  firestoreBlogCollection = this.db.list('ComentarioProduto');
  firestoreBlogRef = this.db.database().ref('ComentarioProduto');

  constructor(private db: AngularFireDatabase) {
    super(db.database().ref('/ComentarioProduto'));
  }

}
