import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _HttpClient:HttpClient) 
  { 
    if(localStorage.getItem('userToken'))
    {
      this.saveUserData();
    }
  }

  baseURL:string='https://sticky-note-fe.vercel.app/';

  userData=new BehaviorSubject(null);

  saveUserData()
  {
    let encodedToken=JSON.stringify(localStorage.getItem('userToken'));
    let decodedToken:any=jwtDecode(encodedToken);
    this.userData.next(decodedToken);
  }

  signUp(data:any):Observable<any>
  {
    return this._HttpClient.post(this.baseURL+'signup',data);
  }

  signIn(data:any):Observable<any>
  {
    return this._HttpClient.post(this.baseURL+'signin',data);
  }

  logOut():void
  {
    localStorage.removeItem('userToken');
    this.userData.next(null);
  }
}
