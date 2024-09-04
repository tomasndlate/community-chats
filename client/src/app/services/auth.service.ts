import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, filter, map, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { AuthToken } from '../models/auth-token.model';
import { ApiErrorResponse, ApiSuccessResponse } from '../models/responses.model';
import { NavigationEnd, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.apiUrl;
  private isUserLoggedInSubject = new BehaviorSubject<boolean>(false);
  isUserLoggedIn$: Observable<boolean> = this.isUserLoggedInSubject.asObservable();
  private urls = {
    current: '',
    previous: ''
  }

  constructor(private http: HttpClient, private router: Router) {
    // Need to be initialize in the app component to track since the beginning
    this.trackUrl();
  }

  signUp(email: string, username: string, password: string, name: string): Observable<boolean> {
    const requestBody = {
      email: email,
      username: username,
      password: password,
      name: name
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${token}`
      }),
    };
    return this.http.post<ApiSuccessResponse<AuthToken>>(`${this.apiUrl}/auth/signup`, requestBody, httpOptions).pipe(
      map((response) => {
        if (!!response.data.accessToken) {
          this.setToken(response.data.accessToken);
          this.setIsUserLoggedIn(true);
          return true;
        }
        return false;
      }),
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error.error);
      })
    )
  }

  signOut() {
    this.removeToken();
    this.setIsUserLoggedIn(false);
    // this.router.navigate(['/signin'])
  }

  private getToken() {
    return localStorage.getItem('accessToken');
  }

  private setToken(token: string) {
    localStorage.setItem('accessToken', token);
  }

  private removeToken(){
    localStorage.removeItem('accessToken');
  }

  private setIsUserLoggedIn(newStatus: boolean): void {
    this.isUserLoggedInSubject.next(newStatus);
  }

  private trackUrl(): void {
    this.urls.current = this.router.url;
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe(
      (event: NavigationEnd) => {
        // console.log(`NAVIGATED TO ${event.url}`)
        if ( !['/auth/signin', '/auth/signup'].includes(event.url) ) {
          this.urls.previous = this.urls.current;
          this.urls.current = event.url;
          // console.log(`URLS previous ${this.urls.previous} | current ${this.urls.current}`)
        }
    })
  }

  getPreviousUrl(): string {
    return this.urls.previous;
  }
}
