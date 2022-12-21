import { Component , OnInit} from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit{
  constructor(private _AuthService:AuthService,private _Router:Router){}

  isSubmitted:boolean=false;
  isSuccesse:boolean=true;
  responseMessage:string='';
  isLoading:boolean=false;

  signInForm:FormGroup=new FormGroup({
    email:new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl('',[Validators.required]),
  })
  ngOnInit(): void {}

  submitBtn()
  {
    this.isLoading=true;
    this.isSubmitted=true;
    this._AuthService.signIn(this.signInForm.value).subscribe({
      next:(response)=>
      {
        this.isLoading=false;
        if(!this.signInForm.invalid)
        {
          if(response.message=='success')
          {
            this.isSuccesse=true;
            this._Router.navigate(['/profile']);
            localStorage.setItem('userToken',response.token);
            this._AuthService.saveUserData();
          }
          else {this.isSuccesse=false;}
          this.responseMessage=response.message;
        }
      }
    })
  }
}
