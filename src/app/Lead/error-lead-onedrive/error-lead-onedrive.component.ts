import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ErrorOnedriveComponent } from '../error-onedrive/error-onedrive.component';

@Component({
  selector: 'app-error-lead-onedrive',
  templateUrl: './error-lead-onedrive.component.html',
  styleUrls: ['./error-lead-onedrive.component.css']
})
export class ErrorLeadOnedriveComponent  {

  constructor(
    public dialogRef: MatDialogRef<ErrorLeadOnedriveComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  onClose(): void {
    this.dialogRef.close();
  }

}
