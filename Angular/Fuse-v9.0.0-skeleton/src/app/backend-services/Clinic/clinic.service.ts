import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { backendUrl } from 'app/shared/constants';
import { Clinic } from '../../models/user';


@Injectable({
  providedIn: 'root'
})
export class ClinicService {

  constructor( private http: HttpClient ) { }
  getAllClinics( ) {
    return this.http.get<Clinic[]>(`${backendUrl}/clinic`)
  }
}
