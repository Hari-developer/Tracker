import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-error-onedrive',
  templateUrl: './error-onedrive.component.html',
  styleUrls: ['./error-onedrive.component.css']
})
export class ErrorOnedriveComponent {

  constructor(
    public dialogRef: MatDialogRef<ErrorOnedriveComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  onClose(): void {
    this.dialogRef.close();
  }

}
