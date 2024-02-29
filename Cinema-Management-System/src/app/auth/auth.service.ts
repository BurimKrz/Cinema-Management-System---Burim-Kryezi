import { Injectable } from '@angular/core';
import { Observable, delay, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  

   login(credentials: { email: string; password: string }): Observable<boolean> {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('loggedInUserEmail');
    localStorage.removeItem('loggedInUsername');

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: any) => u.email === credentials.email && u.password === credentials.password);
    if (user) {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('loggedInUserEmail', user.email);
      localStorage.setItem('loggedInUsername', user.username);
      return of(true);
    } else {
      return of(false);
    }
  }

  signup(formData: any): Observable<boolean> {
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    users.push(formData);
    localStorage.setItem('users', JSON.stringify(users));
    return of(true);
  }
}
