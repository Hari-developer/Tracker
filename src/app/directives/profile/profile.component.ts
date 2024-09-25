import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent  {

  userData: any;

  constructor(
    public dialogRef: MatDialogRef<ProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private tokenStorage: TokenStorageService
  ) {
    this.userData = this.tokenStorage.getUser();
  }

  getRole(): string {
    const roles = this.userData.roles;
    if (roles.includes('ROLE_ADMIN')) return 'Admin';
    if (roles.includes('ROLE_LEAD')) return 'Team Lead';
    return 'Team Member';
  }

  onClose(): void {
    this.dialogRef.close();
  }

}
