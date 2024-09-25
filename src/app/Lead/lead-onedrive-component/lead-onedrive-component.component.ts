import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MessageService } from 'src/app/directives/message.service';
import { LeadService } from 'src/app/services/lead.service';
import { OneDriveComponent } from '../one-drive/one-drive.component';

@Component({
  selector: 'app-lead-onedrive-component',
  templateUrl: './lead-onedrive-component.component.html',
  styleUrls: ['./lead-onedrive-component.component.css']
})
export class LeadOnedriveComponentComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<OneDriveComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { lead: any },
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
      this.leadService.saveLeadOneDriveLink(this.data.lead.leadId,oneDriveLink).subscribe(
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
