import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/directives/message.service';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-updatepassword',
  templateUrl: './updatepassword.component.html',
  styleUrls: ['./updatepassword.component.css']
})
export class UpdatepasswordComponent implements OnInit {
  form: FormGroup;
  isLoggedIn = false;
  errorMessage = '';
  hideOldPassword = true;
  hideNewPassword = true;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      oldPassword: ['', [Validators.required, Validators.minLength(5)]],
      newPassword: ['', [Validators.required, Validators.minLength(5)]]
    });

   
  }

  togglePasswordVisibility(event: Event, field: 'old' | 'new') {
    event.stopPropagation();
    event.preventDefault();
    
    if (field === 'old') {
      this.hideOldPassword = !this.hideOldPassword;
    } else {
      this.hideNewPassword = !this.hideNewPassword;
    }
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { oldPassword, newPassword } = this.form.value;

    this.authService.updatePassword(oldPassword, newPassword).subscribe(
      () => {
        this.tokenStorage.signOut();
        this.messageService.showMessage({
          message:'Password updated successfully.',
          type: 'success'
        });
        sessionStorage.clear();
        this.router.navigate(['/login']);
      },
      error => {
        this.messageService.showMessage({
          message:'Error while updating password.',
          type: 'error'
        });
      }
    );
  }
}