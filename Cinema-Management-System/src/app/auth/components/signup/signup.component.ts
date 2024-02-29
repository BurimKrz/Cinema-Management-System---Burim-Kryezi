import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  isLoading = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.signupForm = this.fb.group({
      username: ['', Validators.required], 
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
  }

  submitForm() {
    if (this.signupForm.valid && !this.isLoading) {
      this.isLoading = true;
      const formData = this.signupForm.value;
      this.authService.signup(formData).subscribe((res: any) => {
        if (res) {
          this.router.navigate(['login']); // Redirect to login after successful signup
        } else {
          window.alert('Signup failed'); // Handle signup failure
        }
        this.isLoading = false;
      }, (error: any) => { // Explicitly declare the error parameter type
        console.error('Signup error:', error); // Log error
        window.alert('An error occurred. Please try again.'); // Inform user about error
        this.isLoading = false;
      });
    }
  }
}