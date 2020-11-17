
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { backendUrl } from 'app/shared/constants';
import { Client } from '../../models/user';


@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor( private http: HttpClient ) { }
  getAllClients( ) {
    return this.http.get<Client[]>(`${backendUrl}/clinic`)
  }
}

