import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { User } from '../_models/user';
import { environment } from 'src/environments/environment.development';
import { Photo } from '../_models/photo';
import { PresenceService } from './presence.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.apiUrl;
  private currentUserSource = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient, private presenceService: PresenceService) { }

  login(model: {username: string, password: string})   {
    return this.http.post<User>(this.baseUrl + '/account/login', model).pipe(
      map((response: User) => {
        const user = response
        if(user) {
          this.setCurrentUser(user)
        }
      })
    )
  }

  setMainPhoto(photo: Photo) {
    return this.http.post<void>(`${this.baseUrl}/users/set-main-photo/${photo.id}`, {})
      .pipe(
        map(() => {})
      )
  }

  deletePhoto(photoId: number) {
    return this.http.delete<{successful: boolean}>(`${this.baseUrl}/users/photo/${photoId}`)
      .pipe(
        map((response) => {
          console.log("delete respone => ", response)
        })
      )
  }
  
  register(model: {username: string, password: string}) {
    return this.http.post<User>(`${this.baseUrl}/account/register`, model).pipe(
      map(response => {
        const user = response;
        if (user) {
          this.setCurrentUser(user)
        }
      })
    )
  }

  setCurrentUser(user: User) {
    user.roles = []
    const roles = this.getDecodedToken(user.token).role;
    Array.isArray(roles) ? user.roles = roles : user.roles.push(roles);
    localStorage.setItem('user', JSON.stringify(user))
    this.currentUserSource.next(user);
    this.presenceService.createHubConnection(user)
  }

  logout() {
    localStorage.removeItem('user')
    this.currentUserSource.next(null)
    this.presenceService.stopHubConnection()
  }

  getDecodedToken(token: string) {
    return JSON.parse(atob(token.split('.')[1]));
  }
}
