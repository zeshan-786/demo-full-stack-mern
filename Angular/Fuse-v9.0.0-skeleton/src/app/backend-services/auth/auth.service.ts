import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { backendUrl } from '../../shared/constants'
import { User, Auth } from '../../models/user'
import 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authData: Auth
  constructor( private http: HttpClient ) { }

  signin( user: User ) {
    return this.http.post<Auth>(`${backendUrl}/auth/signin`, user )
  }

  signup( user: User ) {
    return this.http.post<Auth>(`${backendUrl}/auth/signup`, user )
  }

  setAuth( authData: Auth ) {
    this.authData = authData
  }

  getAuth<Auth>() {
    return this.authData
  }

}
