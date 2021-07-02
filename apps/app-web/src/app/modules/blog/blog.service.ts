import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import { BlogPost } from 'libs/data/src/lib/classes';
import { map } from 'rxjs/operators';
import { removeDuplicates } from '../../helper/ObjHelper';
import { FireBaseService } from '../../data/service/base/firebase.service';

@Injectable({
  providedIn: 'root'
})
export class BlogPostService extends FireBaseService{

  firestoreBlogCollection = this.db.list('BlogPost');

  constructor(private db: AngularFireDatabase) {
    super(db.list('/BlogPosts'));

  }

  FilterByTag(TAGS:string[]){
    this.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.val(), ...c.payload.val() })
        )
      )
    ).subscribe((data :BlogPost[]) => {
      let Blog:Array<BlogPost> = [];
      if(TAGS)
        TAGS.forEach((tag)=>
        {
          data.filter((post)=>
          {
            return post.Tags.forEach((posttag) => {
              if(posttag.includes(tag)){
                Blog.push(post);
                return true;
              }
              return false;
            })
          })
          Blog = removeDuplicates(Blog,"Titulo")
        });
      else{
        Blog = data;
      }
    });
  }
}
