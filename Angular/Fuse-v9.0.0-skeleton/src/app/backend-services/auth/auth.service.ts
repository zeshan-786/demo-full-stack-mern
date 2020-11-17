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
    localStorage.setItem('token', authData.token)
    localStorage.setItem('_id', authData._id)
    localStorage.setItem('email', authData.email)
    localStorage.setItem('type', authData.type)

  }

  getAuth<Auth>() {
    return {
      _id: localStorage.getItem('_id'),
      email: localStorage.getItem('email'),
      token: localStorage.getItem('token'),
      type: localStorage.getItem('type'),
    }
  }

  getAuthToken<String>() {
    return localStorage.getItem('token')
  }

  isAuthenticated() {
    if (localStorage.getItem('token') && localStorage.getItem('_id') && localStorage.getItem('email') && localStorage.getItem('type')) {
      console.log("Auth Cleared!");
      return true
    }
    return false
  }

}
