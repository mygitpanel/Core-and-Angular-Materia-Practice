import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Iuser } from '../_Interfaces/Iuser';
import {map} from 'rxjs/operators';
import { Observable, ReplaySubject } from 'rxjs';
import { userModel } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class UserregisterService {
  apiurl:string = 'http://localhost:5000/api/account/';

  // create observable to share data between components.
  // ReplaySubject is a special type of observable which basically store value in buffer and when we subscribe it we can access the value.
  private currentUserSource = new ReplaySubject<userModel>(1); // ReplaySubjext needs a buffer size. So we have only one value as user so we define 1 as buffer size.
  currentuser$ = this.currentUserSource.asObservable(); // currentuser$ is going to be observable variable so we need to append $ with the name as it stores observable.

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
    }).pipe(map((res:userModel) => {
      const user = res;
      if(res){
        localStorage.setItem('user',JSON.stringify(user));
        this.currentUserSource.next(user);
      }
    }));
  }

  SetCurrentUser(user:userModel)
  {
    this.currentUserSource.next(user);
  }

  logout()
  {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }
}
