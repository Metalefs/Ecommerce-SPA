import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import { BlogPost } from 'libs/data/src/lib/classes';
import { FireBaseService } from '../base/firebase.service';

@Injectable({
  providedIn: 'root'
})
export class BlogPostService extends FireBaseService{

  firestoreBlogCollection = this.db.list('BlogPost');

  constructor(private db: AngularFireDatabase) {
    super(db.list('/BlogPosts'));

  }

}
