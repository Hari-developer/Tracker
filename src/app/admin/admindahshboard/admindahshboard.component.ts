import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { BreakpointObserver } from '@angular/cdk/layout';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';
import { AuthService } from 'src/app/services/auth.service';
import { CreateuserComponent } from '../createuser/createuser.component';
import { DeleteUserComponent } from '../delete-user/delete-user.component';

@Component({
  selector: 'app-admindahshboard',
  templateUrl: './admindahshboard.component.html',
  styleUrls: ['./admindahshboard.component.css']
})

export class AdmindahshboardComponent implements OnInit {
  displayedColumns = ['username', 'userEmpId', 'roles','action'];
  userDetails: any;
  public dataSource:any;
  subscriptionList: Subscription[] = [];
  selectedStudy: boolean = false;
  constructor(@Inject(SESSION_STORAGE) private storage: StorageService, breakpointObserver: BreakpointObserver, public dialog: MatDialog, public userservice: AuthService,){
   
  }

  ngOnInit() {
      this.getAlluser();
  }

  openCreateUserDialog() {
    const dialogRef = this.dialog.open(CreateuserComponent, {
      width: '400px',
      hasBackdrop: true,
      disableClose: true,
      autoFocus: false,
      data: ''
    });

    let subscription2: Subscription = dialogRef.afterClosed().subscribe(_result => {
      this.getAlluser();
    });
    this.subscriptionList.push(subscription2);
  }

  openDeleteUserDialog(row:any){
    const dialogRef = this.dialog.open(DeleteUserComponent, {
      width: '400px',
      hasBackdrop: true,
      disableClose: true,
      autoFocus: false,
      data: {rowdata : row, module: 'user'}
    });

    let subscription3: Subscription = dialogRef.afterClosed().subscribe(_result => {
      // console.log('The dialog was closed');
    });
    this.subscriptionList.push(subscription3);
  }

  openEditUserDialog(row:any) {
    
  }

  getAlluser() {
     this.userservice.getalluser().subscribe((data: any) => {
      this.dataSource = data;
    });
  }
  
  

  onSubmit() {
  }

}
