import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { MessageService } from 'src/app/directives/message.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-lead',
  templateUrl: './add-lead.component.html',
  styleUrls: ['./add-lead.component.css']
})
export class AddLeadComponent implements OnInit {

  public addLeadForm: FormGroup;
  public message: string;
  public isSubmitted = false;
  public emailErrorMessage: any;
  public userIdErrorMessage: any;
  roles: any;
  subscriptionList: Subscription[] = [];
  ROLE_LEAD = 'ROLE_LEAD';

  constructor(public dialogRef: MatDialogRef<AddLeadComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, private _snackBar: MatSnackBar,
    private authService: AuthService,private userService:UserService,private messageService:MessageService) {
      let subscription2: Subscription = dialogRef.afterClosed().subscribe(_result => {
        this.getAlluser();
      });
      this.subscriptionList.push(subscription2);
  }

  ngOnInit() {

    this.addLeadForm = this.fb.group({
      leadName: [
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
      roleName: [{ value: this.ROLE_LEAD, disabled: true }, Validators.required]
    });

  }

  validate() {
    if (this.addLeadForm.valid) {
      this.createUser();
    }
    else {
      this.validateAllFormFields(this.addLeadForm);
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
  
  getAlluser() {
    this.authService.getalluser().subscribe((data: any) => {
   });
 }
 

  createUser() {
    const formData = this.addLeadForm.getRawValue();
    this.userService.saveLead(formData).subscribe(
      (pro) => {
        this.messageService.showMessage({
          message:'Lead added Successfully',
          type: 'success'
        });
        this.getAlluser();
        this.dialogRef.close(true);
      },
      (error) => {
        this.messageService.showMessage({
          message:'Error while adding lead.',
          type: 'error'
        });
      }
    );
  }



  ngOnDestroy() {
    this.subscriptionList.forEach(subscription => subscription.unsubscribe());
  }

}
