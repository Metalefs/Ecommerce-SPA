import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import { BlogPost } from 'libs/data/src/lib/classes';

@Injectable({
  providedIn: 'root'
})
export class BlogPostService {
  constructor(private db: AngularFireDatabase) {
    this.BlogPostsRef = db.list(this.dbPath);
  }

  firestoreBlogCollection = this.db.list('BlogPost');

  private dbPath = '/BlogPosts';

  BlogPostsRef: AngularFireList<BlogPost> = null;

  getAll(): AngularFireList<BlogPost> {
    return this.BlogPostsRef;
  }

  create(BlogPost: BlogPost): any {
    return this.BlogPostsRef.push(BlogPost);
  }

  update(key: string, value: any): Promise<void> {
    return this.BlogPostsRef.update(key, value);
  }

  delete(key: string): Promise<void> {
    return this.BlogPostsRef.remove(key);
  }

  deleteAll(): Promise<void> {
    return this.BlogPostsRef.remove();
  }
}
