import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {LoginService} from 'src/app/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
username:string;
loginForm: FormGroup;
password:string;
  constructor(public nav: LoginService, private router: Router,private _formBuilder: FormBuilder,) { 
    this.nav.islogin(false);
  }
  LoginClicked(){
    if(((this.loginForm.get('userName').value == "User") ||(this.loginForm.get('userName').value == "user" )) && this.loginForm.get('password').value == "Exalca@2021")
    {
        this.router.navigate(['/homepage']); 
    }
  }
  ngOnInit(): void {
    this.loginForm = this._formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

}
