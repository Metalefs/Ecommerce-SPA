import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class CadastroService {
    public Cadastrar: Observable<boolean>;
    private CadastrarSubject: BehaviorSubject<boolean>;

    constructor() {
        this.CadastrarSubject = new BehaviorSubject<boolean>(JSON.parse(localStorage.getItem('cadastrar')));
        this.Cadastrar = this.CadastrarSubject.asObservable();
    }

    public get current(): boolean{
        return this.CadastrarSubject.value;
    }

    setCadastrar(State:boolean) {
        localStorage.setItem('cadastrar', JSON.stringify(State));
        this.Cadastrar = this.CadastrarSubject.asObservable();
    }
}