import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { MessageService } from 'src/app/directives/message.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

interface CreateUserFormValue {
  employeeName: string;
  userEmpId: string;
  leadId: { leadName: string; leadId: number };
  roleName: string;
}

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.css']
})


export class AddMemberComponent implements OnInit {

  public createUserForm: FormGroup;
  public message: string;
  public isSubmitted = false;
  public emailErrorMessage: any;
  public userIdErrorMessage: any;
  leads: any;
  subscriptionList: Subscription[] = [];
  ROLE_MEMBER = 'ROLE_MEMBER';

  constructor(public dialogRef: MatDialogRef<AddMemberComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, private _snackBar: MatSnackBar,
    private userservice: UserService,private authService:AuthService,private messageService:MessageService) {
    let subscription: Subscription = this.userservice.getallLeads().subscribe(leads => {
      this.leads = leads;
    });
    this.subscriptionList.push(subscription);
  }

  ngOnInit() {

    this.createUserForm = this.fb.group({
      employeeName: [
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
      leadId: [
        null,
        Validators.compose([
          Validators.required
        ])
      ],
      roleName: [{ value: this.ROLE_MEMBER, disabled: true }, Validators.required]
    });



  }
  validate() {
    if (this.createUserForm.valid) {
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
  

  createUser() {
    let formValue: CreateUserFormValue = this.createUserForm.getRawValue(); 
    let leadId = formValue.leadId.leadId; 
    let payload = {
      employeeName: formValue.employeeName,
      leadId: leadId,
      userEmpId: formValue.userEmpId,
      roleName: formValue.roleName 
    };
    this.userservice.saveEmployee(payload).subscribe(
      (pro) => {
        this.messageService.showMessage({
          message:'Member added Successfully',
          type: 'success'
        });
        this.dialogRef.close(true);
        this.getAlluser
      },
      (error) => {
        this.messageService.showMessage({
          message:'Error while adding member.',
          type: 'error'
        });
      }
    );
  }

  getAlluser() {
    this.authService.getalluser().subscribe((data: any) => {
   });
  }
  getAllLeads() {
    this.userservice.getallLeads().subscribe(
      (leads) => {
        this.leads = leads;
      },
      (error) => {
        console.error('Error loading leads:', error);
      }
    );
  }
  ngOnDestroy() {
    this.subscriptionList.forEach(subscription => subscription.unsubscribe());
  }

}
