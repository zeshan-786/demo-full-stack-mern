import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { backendUrl } from '../../shared/constants'
import { User } from '../../models/user'
import 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  
  admins : User []
  constructor( private http: HttpClient ) { }

  getAllAdmins( ) {
    return this.http.get<User[]>(`${backendUrl}/admin`)
  }

  setAdmins( admins : User [] ){
    this.admins = admins
  }

  getCachedAdmins() {
    return this.admins
  }

}
