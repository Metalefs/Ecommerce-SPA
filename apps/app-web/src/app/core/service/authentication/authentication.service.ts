import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from "../../../../environments/environment";
import { entities } from '@personalizados-lopes/data';
import { RouteDictionary } from 'libs/data/src/lib/routes/api-routes';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<entities.Usuario>;
    public currentUser: Observable<entities.Usuario>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<entities.Usuario>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): entities.Usuario {
        return this.currentUserSubject.value;
    }

    signup(Usuario : entities.Usuario){
        return this.http.post<any>(`${environment.endpoint}`+RouteDictionary.Usuario +RouteDictionary.Registro, { Usuario })
        .pipe(map(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            if(user.error == undefined){
                console.log(user);
                if(user.token){
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                    return user;
                }
                throw "Nome ou senha inválidos";
            }
            else{
                throw user.error;
            }
        }));
    }

    login(Email: string, Senha: string) {
        return this.http.post<any>(`${environment.endpoint}`+ RouteDictionary.Usuario + RouteDictionary.Login, { Email, Senha })
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                if(user.token){
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                }else{
                    throw "Nome ou senha inválidos";
                }
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }

    tokenize(item:object){
        return {item, token: this.currentUserSubject?.value?.token}
    }
}
