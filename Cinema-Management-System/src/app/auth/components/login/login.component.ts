import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  isLoading = false;
  constructor(private fb: FormBuilder,private authService:AuthService,private router: Router) { 
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
  }

  submitForm() {
    if (this.loginForm.valid && !this.isLoading) {
      this.isLoading = true;
      const formData = this.loginForm.value;
      
      this.authService.login(formData).subscribe((res:any) => {
        if(res == true){
          this.router.navigate(['movies/all-movies'])
          this.isLoading = false;
        }
        else{
          window.alert('Your password or email is incorrect')
          
          this.isLoading = false;
        }
      
        },
        (error) => {
          this.isLoading = false;
        }
      );
    }
  }
  
}