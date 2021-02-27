import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';
import { entities } from '@personalizados-lopes/data';
import { RouteDictionary } from 'libs/data/src/lib/routes/api-routes';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Usuario } from 'libs/data/src/lib/classes';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<entities.Usuario>;
  public currentUser: Observable<entities.Usuario>;

  constructor(private http: HttpClient, private snack: MatSnackBar) {
    this.currentUserSubject = new BehaviorSubject<entities.Usuario>(
      JSON.parse(localStorage.getItem('currentUser'))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): entities.Usuario {
    return this.currentUserSubject.value;
  }
  public setUser(user: Usuario) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }
  signup(Usuario: entities.Usuario) {
    if (Usuario.Senha)
      return this.http
        .post<any>(
          `${environment.endpoint}` +
            RouteDictionary.Usuario +
            RouteDictionary.Registro,
          { Usuario }
        )
        .pipe(
          map((user) => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            if (user.error == undefined) {
              console.log(user);
              if (user.token) {
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
                return user;
              }
              this.snack.open('Já existe um usuário com este e-mail', 'Fechar');
            } else {
              this.snack.open(user.error, 'Fechar');
              throw user.error;
            }
          })
        );
    else {
      this.tempSignup(Usuario);
    }
  }
  tempSignup(Usuario: entities.Usuario) {
    return this.http
      .post<any>(
        `${environment.endpoint}` +
          RouteDictionary.Usuario +
          RouteDictionary.RegistroTemporario,
        { Usuario }
      )
      .pipe(
        map((user) => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          if (user.error == undefined) {
            console.log(user);
            if (user.token) {
              localStorage.setItem('currentUser', JSON.stringify(user));
              this.currentUserSubject.next(user);
              return user;
            }
            this.snack.open('Já existe um usuário com este e-mail', 'Fechar');
          } else {
            this.snack.open(user.error, 'Fechar');
            throw user.error;
          }
        })
      );
  }

  login(Email: string, Senha: string) {
    return this.http
      .post<any>(
        `${environment.endpoint}` +
          RouteDictionary.Usuario +
          RouteDictionary.Login,
        { Email, Senha }
      )
      .pipe(
        map((user) => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          if (user.token) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUserSubject.next(user);
          } else {
            this.snack.open('Nome ou senha inválidos', 'Fechar');
            throw 'Nome ou senha inválidos';
          }
        })
      );
  }

  changePassword(email: string) {
    return this.http
      .post<any>(
        `${environment.endpoint}` +
          RouteDictionary.Usuario +
          RouteDictionary.RecuperarSenha,
        { email }
      )
      .pipe(
        map((user) => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          if (user) {
            this.snack.open(
              'Instruções para troca de senha enviadas ao e-mail inserido (' +
                email +
                ')',
              'Fechar',
              {
                verticalPosition:"top",
                horizontalPosition:"left"
              }
            );
          } else {
            this.snack.open('E-mail não encontrado', 'Fechar',
            {
              verticalPosition:"top",
              horizontalPosition:"left"
            });
          }
        })
      );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  tokenize(item: object) {
    return { item, token: this.currentUserSubject?.value?.token };
  }
}
