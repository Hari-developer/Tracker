import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LeadService } from 'src/app/services/lead.service';
import { MessageService } from 'src/app/directives/message.service';

@Component({
  selector: 'app-one-drive',
  templateUrl: './one-drive.component.html',
  styleUrls: ['./one-drive.component.css']
})
export class OneDriveComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<OneDriveComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { employee: any },
    private leadService: LeadService,
    private messageService:MessageService
  ) {
    this.form = this.fb.group({
      oneDriveLink: ['', [Validators.required, Validators.pattern('https?://.*')]]
    });
  }
  ngOnInit(): void {
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.form.valid) {
      const oneDriveLink = this.form.get('oneDriveLink')?.value;
      this.leadService.saveEmployeeOneDriveLink(this.data.employee.employeeId,oneDriveLink).subscribe(
        (res:any) => {
          this.messageService.showMessage({
            message:'Onedrive link added Successfully',
            type: 'success'
          });
          this.dialogRef.close(res);
        },
        (error:any) => {
          this.messageService.showMessage({
            message:'Onedrive link added Error',
            type: 'error'
          });
        }
      );
    }
  }
}
