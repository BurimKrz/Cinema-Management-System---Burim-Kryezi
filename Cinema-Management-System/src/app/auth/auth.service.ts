import { Injectable } from '@angular/core';
import { Observable, delay, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  

  login(credentials: { email: string; password: string }): Observable<boolean> {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: any) => u.email === credentials.email && u.password === credentials.password);
    return of(!!user);
  }

  signup(formData: any): Observable<boolean> {
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    users.push(formData);
    localStorage.setItem('users', JSON.stringify(users));
    return of(true);
  }
}
