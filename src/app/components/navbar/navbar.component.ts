import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component,OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{
  constructor(private _AuthService:AuthService,private _Router:Router){}
  isLogined:boolean=false;
  userData:any
  userName:string='';

  ngOnInit():void
  {
    this._AuthService.userData.subscribe({
      next:()=>
      {
        if(this._AuthService.userData.getValue()!=null)
        {
          this.isLogined=true;
          this.userData=this._AuthService.userData.getValue();
          this.userName=this.userData.first_name;
        }
      }
    })
  }

  logOut():void
  {
    this._AuthService.logOut();
    this._Router.navigate(['/home']);
    this.isLogined=false;
  }
}
