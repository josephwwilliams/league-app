import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, throwError } from 'rxjs';
import { User } from './user.model';

export interface AuthResponseData {
  kind: string,
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string,
  registered?: boolean
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new BehaviorSubject<User>(null);


  constructor(private http:HttpClient) { }

  signUp(email: string, password: string){
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCQJQPRbwAiNAV8GxHxWBcXRTHZceIBaEU',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(catchError(this.handleError), tap(res => {
      this.handleNewUser(res.email, res.localId, res.idToken, +res.expiresIn)
    }));
  }

  login(email:string, password: string){
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCQJQPRbwAiNAV8GxHxWBcXRTHZceIBaEU',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(catchError(this.handleError), tap(res => {
      this.handleNewUser(res.email, res.localId, res.idToken, +res.expiresIn)
    }));
  }

  private handleNewUser(email: string, userId: string, token: string, expiresIn: number){
    const expirationDate =  new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
  }

  private handleError(errorRes: HttpErrorResponse){
    let errorMessage = 'An unknown error occurred!';
      if(!errorRes.error || !errorRes.error.error){
        return throwError(errorMessage);
      }
      switch (errorRes.error.error.message) {
        case 'EMAIL_EXISTS':
          errorMessage = 'This email already exists';
          break;
        case 'EMAIL_NOT_FOUND':
          errorMessage = 'Cannot find an account with that email';
          break;
        case 'INVALID_PASSWORD':
          errorMessage = 'Invalid Password';
          break;
      }
      return throwError(errorMessage)

  }
}
