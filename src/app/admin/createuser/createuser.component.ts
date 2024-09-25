import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { MessageService } from 'src/app/directives/message.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-createuser',
  templateUrl: './createuser.component.html',
  styleUrls: ['./createuser.component.css']
})
export class CreateuserComponent implements OnInit {

  public createUserForm: FormGroup;
  public message: string;
  public isSubmitted = false;
  public emailErrorMessage: any;
  public userIdErrorMessage: any;
  roles: any;
  subscriptionList: Subscription[] = [];
  payload: any;

  constructor(public dialogRef: MatDialogRef<CreateuserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, private _snackBar: MatSnackBar,
    private userservice: UserService,private messageService:MessageService) {
    let subscription: Subscription = this.userservice.getAllRoles().subscribe(roles => {
      this.roles = roles;
    });
    this.subscriptionList.push(subscription);
  }

  ngOnInit() {

    this.createUserForm = this.fb.group({
      username: [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20)
        ])
      ],
      userEmpId: [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20)
        ])
      ],
      roles: [
        null,
        Validators.compose([
          Validators.required
        ])
      ]
    });



  }
  validate() {
    if (this.createUserForm.valid) {
      this.setPayload();
      this.createUser();
    }
    else {
      this.validateAllFormFields(this.createUserForm);
    }
  }
  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }
  setPayload() {
    this.payload = {
      username: this.createUserForm.value.username,
      userEmpId: this.createUserForm.value.userEmpId,
      roles: [this.createUserForm.value.roles]
    };
  }

  createUser() {
    this.userservice.createUser(this.payload).subscribe(
      (pro) => {
        this.messageService.showMessage({
          message:'Admin added Successfully',
          type: 'success'
        });
        this.dialogRef.close(true);
      },
      (error) => {
        this.messageService.showMessage({
          message:'Error while adding admin',
          type:'error'
        });
      }
    );
  }


  loadRoles() {
    this.userservice.getAllRoles().subscribe(
      (roles) => {
        this.roles = roles;
      },
      (error) => {
        console.error('Error loading roles:', error);
      }
    );
  }
  ngOnDestroy() {
    this.subscriptionList.forEach(subscription => subscription.unsubscribe());
  }

}
