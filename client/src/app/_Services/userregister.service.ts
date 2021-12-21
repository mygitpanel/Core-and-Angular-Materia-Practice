import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Iuser } from '../_Interfaces/Iuser';
import {map} from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserregisterService {
  apiurl:string = 'http://localhost:5000/api/account/';

  constructor(private _http:HttpClient) { }

  registerService(user:Iuser)
  {
    return this._http.post(this.apiurl + 'register',user, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).pipe(map((response:any) => {
      if(response){
        console.log(response);
      }
    }));
  }

  loginService(user:Iuser)
  {
   return this._http.post(this.apiurl + 'login',user, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).pipe(map((res:any) => {
      debugger;
      if(res){
        console.log(res);
      }
    }));
  }
}
