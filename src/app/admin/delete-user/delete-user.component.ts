// delete-user.component.ts
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { MessageService } from 'src/app/directives/message.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent implements OnInit {
  operation: string;
  subscriptionList: Subscription[] = [];

  constructor(
    public dialogRef: MatDialogRef<DeleteUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userservice: UserService,
    private messagePopupService: MessageService
  ) { }

  ngOnInit() {
    this.operation = this.data.rowdata.active ? 'delete' : 'restore';
  }

  deactivateUser() {
    if (this.data.module === 'user') {
      this.data.rowdata.active = !this.data.rowdata.active;
      this.updateActivate();
    } else {
      this.dialogRef.close('yes');
    }
  }

  updateActivate() {
    let subscription1: Subscription;
    if (this.data.module === 'user') {
      subscription1 = this.userservice.deleteUser(this.data.rowdata).subscribe(
        _data => {
          this.showMessagePopup();
        },
        error => {
          this.messagePopupService.showMessage({
            message: 'An error occurred. Please try again.',
            type: 'error'
          });
        }
      );
      this.subscriptionList.push(subscription1);
    }
  }

  showMessagePopup() {
    const message = this.operation === 'delete' 
      ? 'User has been successfully deleted.' 
      : 'User has been successfully restored.';
    
    this.messagePopupService.showMessage({
      message: message,
      type: 'success'
    });
    
    this.dialogRef.close();
  }

  ngOnDestroy() {
    this.subscriptionList.forEach(subscription => subscription.unsubscribe());
  }
}