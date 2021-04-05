
import { AngularFireList} from '@angular/fire/database';
export class FireBaseService{
  constructor(private list:AngularFireList<any>){

  }
  getAll(): AngularFireList<any> {
    return this.list;
  }

  create(entity): any {
    return this.list.push(entity);
  }

  update(key: string, value: any): Promise<void> {
    value.DataHoraAlteracao = new Date();
    return this.list.update(key, value);
  }

  delete(key: string): Promise<void> {
    return this.list.remove(key);
  }

  deleteAll(): Promise<void> {
    return this.list.remove();
  }
}
