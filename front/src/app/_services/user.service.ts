import { Injectable } from "@angular/core";
import { ICredential, IUserCredential } from "../_interfaces/credentials";
import { Observable } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { FormGroup } from "@angular/forms";
import { IToken } from "../_interfaces/token";
import { IUser } from "../_interfaces/users";


@Injectable({
    providedIn: 'root'
  })
  export class UserService {
  
    // url = "http://64.226.75.174:6868/api/auth";
    url = "http://localhost:3002/api/users";
  
    constructor(private http: HttpClient) { }
  
    getAllUsers(): Observable<IUser[]>{
      return this.http.get<IUser[]>(this.url+'/all')
    }

    getCurrentUser(): Observable<IUser>{
        return this.http.get<IUser>(this.url+'/currentuser')
    }
  
  }