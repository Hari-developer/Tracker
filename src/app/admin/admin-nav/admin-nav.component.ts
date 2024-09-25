import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { AddLeadComponent } from '../add-lead/add-lead.component';
import { AddMemberComponent } from '../add-member/add-member.component';
import { CreateuserComponent } from '../createuser/createuser.component';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from 'src/app/directives/message.service';

@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-nav.component.html',
  styleUrls: ['./admin-nav.component.css']
})
export class AdminNavComponent implements OnInit {

  constructor(
    private router: Router,
    private tokenStorageService: TokenStorageService,
    private dialog: MatDialog,
    private userservice:AuthService,
    private messageService:MessageService
  ) { }

  ngOnInit(): void {
    this.getAlluser();
  }

  getAlluser() {
    this.userservice.getalluser().subscribe((data: any) => {
   });
 }

  openAddLeadDialog(){
    const dialogRef = this.dialog.open(AddLeadComponent, {
      width: '400px',
      hasBackdrop: true,
      disableClose: true,
      autoFocus: false,
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getAlluser();
        window.location.reload();
      }
    });
  }

  openAddMemberDialog(){
    const dialogRef = this.dialog.open(AddMemberComponent, {
      width: '400px',
      hasBackdrop: true,
      disableClose: true,
      autoFocus: false,
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getAlluser();
        window.location.reload();
      }
    });
  }

  openAddAdminDialog(){
    const dialogRef = this.dialog.open(CreateuserComponent, {
      width: '400px',
      hasBackdrop: true,
      disableClose: true,
      autoFocus: false,
    });
  }
  

  logout(): void {
    this.tokenStorageService.signOut();
    sessionStorage.clear();
   
    setTimeout(() => {
      this.messageService.showMessage({
        message:'Logout Successfully',
        type: 'success'
      });
      this.router.navigate(['/login']);
    }, 1000);
  }
}
