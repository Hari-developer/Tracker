import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/directives/message.service';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  passwordUpdated:any;
  hideOldPassword = true;
  hideNewPassword = true;


  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      userEmpId: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
      password: ['', Validators.required]
    });
  
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
      
    const { userEmpId, password } = this.form.value;
      
    this.authService.login(userEmpId, password).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        this.passwordUpdated=data.update;

        
        sessionStorage.setItem('userData', JSON.stringify(data));
        
        this.messageService.showMessage({
          message: 'Login successful!',
          type: 'success'
        });
        this.redirectBasedOnRole();
      },
      err => {
        // this.errorMessage = err.error.message;
        this.messageService.showMessage({
          message:'Login failed. Please try again.',
          type: 'error'
        });
        this.isLoginFailed = true;
      }
    );
  }
  
  redirectBasedOnRole(): void {
    let roles = this.roles.filter(p => p === 'ROLE_ADMIN' || p === 'ROLE_LEAD' || p === 'ROLE_MEMBER');
    
    if (roles.includes('ROLE_ADMIN')) {
      this.router.navigate(['/admin-dashboard']);
    } else if (roles.includes('ROLE_LEAD') || roles.includes('ROLE_MEMBER')) {
      if (this.passwordUpdated) {
        this.router.navigate(['/lead-dashboard']);
      } else {
        this.router.navigate(['/update-password']);
      }
    } else {
      this.router.navigate(['/error']);
    }
  }

  togglePasswordVisibility(event: Event) {
    event.stopPropagation();
    event.preventDefault();  
    this.hideNewPassword = !this.hideNewPassword;
  }


}
