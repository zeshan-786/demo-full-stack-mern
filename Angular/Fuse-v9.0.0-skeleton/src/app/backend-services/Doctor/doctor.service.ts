import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { backendUrl } from 'app/shared/constants';
import { Doctor } from '../../models/user';


@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor( private http: HttpClient ) { }
  getAllDoctors( ) {
    return this.http.get<Doctor[]>(`${backendUrl}/doctor`)
  }
}
