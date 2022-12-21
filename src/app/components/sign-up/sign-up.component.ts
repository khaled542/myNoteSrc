import { AuthService } from './../../services/auth.service';
import { Component,OnInit} from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit{
  constructor(private _AuthService:AuthService,private _Router:Router){}

  isSubmitted:boolean=false;
  isSuccesse:boolean=true;
  isLoading:boolean=false;

  signUpForm:FormGroup=new FormGroup({
    first_name:new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(10)]),
    last_name:new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(10)]),
    age:new FormControl('',[Validators.required,Validators.min(18),Validators.max(40)]),
    email:new FormControl('',[Validators.required,Validators.email,Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]),
    password:new FormControl('',[Validators.required,Validators.pattern(/^[a-z][A-Z][0-9]{3}$/)]),
  })
  ngOnInit(): void {}
  
  submitBtn()
  {
    this.isLoading=true;
    this.isSubmitted=true;
    this._AuthService.signUp(this.signUpForm.value).subscribe({
      next:(response)=>
      {
        this.isLoading=false;
        if(!this.signUpForm.invalid)
        {
          console.log(this.signUpForm);
          if(response.message=='success')
          {
            this.isSuccesse=true;
            this._Router.navigate(['/sign-in']);
          }
          else {this.isSuccesse=false;}
        }
      }
    })
  }
}
// ,Validators.pattern('/^[a-z]{3}$/')