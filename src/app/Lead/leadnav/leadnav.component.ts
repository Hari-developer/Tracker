import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { Router } from '@angular/router';
import { ProfileComponent } from 'src/app/directives/profile/profile.component';
import { LeadService } from 'src/app/services/lead.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { OneDriveComponent } from '../one-drive/one-drive.component';
import { Overlay } from '@angular/cdk/overlay';
import { ErrorOnedriveComponent } from '../error-onedrive/error-onedrive.component';
import { MessageService } from 'src/app/directives/message.service';
import { ErrorLeadOnedriveComponent } from '../error-lead-onedrive/error-lead-onedrive.component';
import { LeadOnedriveComponentComponent } from '../lead-onedrive-component/lead-onedrive-component.component';

@Component({
  selector: 'app-leadnav',
  templateUrl: './leadnav.component.html',
  styleUrls: ['./leadnav.component.css']
})
export class LeadnavComponent implements OnInit {
  @ViewChild('employeeMenuTrigger', { static: false }) employeeMenuTrigger: MatMenuTrigger;
  leadData: any;
  leadWithMappedEmployeeData: any;
  isLeadMenuOpen: boolean = false;
  isApplicationsMenuOpen: boolean = false;
  isTrackerMenuOpen: boolean = false;
  memberMenuOpen:boolean = false;
  currentUser: any;
  fullUserDetails: any;
  userRole: any;
  currentLeadId: any;
  currentMemberId: any;
  currentId: any;
  applications:any;
  trackers:any;
  userData:any;
  isProfileDropupOpen = false;

  constructor(
    private router: Router,
    private tokenStorageService: TokenStorageService,
    private leadService: LeadService,
    private dialog: MatDialog,
    private overlay: Overlay,
    private messageService:MessageService
  ) { 
  }

  ngOnInit(): void {
    this.currentUser = this.tokenStorageService.getUser();
    this.userRole = this.currentUser.roles[0];
    if (this.userRole === 'ROLE_LEAD') {
      this.leadService.getAllLeads().subscribe(
        (res) => {
          const matchingLead = res.find((lead: any) =>
            lead.userEmpId === this.currentUser.userEmpId
          );
          if (matchingLead) {
            this.currentLeadId = matchingLead.leadId;
             this.getAllLeads();

          }
        },
        (error) => {

        }
      );
    }
    else if (this.userRole === 'ROLE_MEMBER') {
      this.leadService.getAllEmployees().subscribe(
        (res) => {
          const matchingMember = res.find((member: any) =>
            member.userEmpId === this.currentUser.userEmpId,
          );
          if (matchingMember) {
            this.currentMemberId = this.currentUser.userEmpId;
            this.currentId = matchingMember.employeeId;
              setTimeout(() => {
                this.findCurrentMemberLead(this.currentId);
              }, 1000);
          }
        },
        (error) => {

        }
      );
    }
  this.getAllApps();
  this.getAllTrackers();
  this.userData = this.tokenStorageService.getUser();
  }
  getAllApps() {
    this.leadService.getAllApps().subscribe((data: any) => {
      this.applications = data;
    });
  }

  canAccessEmployee(employee: any): boolean {
    return (this.userRole === 'ROLE_MEMBER' && this.userData.userEmpId === employee.userEmpId) || (this.userRole === 'ROLE_LEAD' && this.currentLeadId === employee.lead.leadId);
  }


  getAllLeads() {
    this.leadService.getAllLeads().subscribe((data: any) => {
      this.leadData = data;
      this.leadWithMappedEmployeeData = [];
    });
  }

  findCurrentMemberLead(id: any) {
    this.leadService.getEmployeeById(id).toPromise()
      .then((res: any) => {
        this.currentLeadId = res.lead.leadId;
        return this.leadService.getLeadById(this.currentLeadId).toPromise();
      })
      .then((leadData: any) => {
        this.leadData = leadData;
        return this.leadService.selectLead(this.currentLeadId).toPromise();
      })
      .then((mappedEmployeeData: any) => {
        this.leadWithMappedEmployeeData = mappedEmployeeData;
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  

  currentLeadData(id:any){
    this.leadService.getLeadById(id).subscribe(
      (res)=>{
       this.leadData=res
      },
      (error)=>{

      }
    );
  }

  onLeadSelect(leadId: string) {
    this.leadService.selectLead(leadId).subscribe(
      (response) => {
        this.leadWithMappedEmployeeData = response;
      },
      (error) => {
        console.error('Error selecting lead:', error);
      }
    );
  }

  onEmployeeMenuOpened(leadId: string) {
    if (this.userRole === 'ROLE_LEAD' || (this.userRole === 'ROLE_MEMBER' && leadId === this.currentLeadId)) {
      this.onLeadSelect(leadId);
    }
  }

  

  onEmployeeMenuClosed() {
    this.leadWithMappedEmployeeData = [];
  }

  logout(): void {

  this.tokenStorageService.signOut();
  sessionStorage.clear();
  this.currentUser = null;
  this.userRole = null;
  this.currentLeadId = null;
  this.currentMemberId = null;
  this.currentId = null;
  this.leadData = null;
  this.leadWithMappedEmployeeData = null;
  this.isLeadMenuOpen = false;
  this.isApplicationsMenuOpen = false;
  setTimeout(() => {
    this.messageService.showMessage({
      message:'Logout Successfully',
      type: 'success'
    });
    this.router.navigate(['/login']);
  }, 1000);
}



  onLeadMenuOpened() {
    this.isLeadMenuOpen = true;
  }

  onLeadMenuClosed() {
    this.isLeadMenuOpen = false;
  }

  onApplicationsMenuOpened() {
    this.isApplicationsMenuOpen = true;
  }

  onApplicationsMenuClosed() {
    this.isApplicationsMenuOpen = false;
  }

  onTrackerMenuOpened(){
    this.isTrackerMenuOpen=true;
  }
  onTrackerMenuClosed(){
    this.isTrackerMenuOpen=false;
  }
  onMemberMenuOpened(){
    this.memberMenuOpen=true;
  }
  onMemberMenuClosed(){
    this.memberMenuOpen=false;
  }
  onMouseEnter(leadId: number): void {
    this.employeeMenuTrigger.menuData = { leadId: leadId };
    this.employeeMenuTrigger.openMenu();
  }

  onMouseLeave(): void {
    this.employeeMenuTrigger.closeMenu();
  }

  // openProfilePopup(): void {
  //   const dialogRef = this.dialog.open(ProfileComponent, {
  //     width: '300px',
  //     position: { top: '80px', right: '20px' },
  //     panelClass: 'profile-dialog-container'
  //   });
  // }
  redirectToApp(url: string, event: Event) {
    event.preventDefault();
    event.stopPropagation();
    window.open(url, '_blank');
  }

  redirectToTracker(url: string, event: Event){
    event.preventDefault();
    event.stopPropagation();
    window.open(url, '_blank');
  }

  
  handleEmployeeClick(employee: any) {
    const isCurrentUser = employee.userEmpId === this.currentUser.userEmpId;
  
    if (isCurrentUser) {
      this.leadService.getEmployeeByOneDriveUpdate(employee.employeeId).subscribe(
        response => {
          if (response.updateOneDrive) {
            this.redirectToOneDrive(response.oneDriveLink);
          } else {
            this.openOneDriveSavePopup(employee);
          }
        },
        error => {
        }
      );
    } else if (this.userRole === 'ROLE_MEMBER') {
      this.leadService.getEmployeeByOneDriveUpdate(employee.employeeId).subscribe(
        response => {
          if (response.updateOneDrive) {
            this.redirectToOneDrive(response.oneDriveLink);
          } else {
            this.showUserNotAddedOneDriveMessage(employee);
          }
        },
        error => {
        }
      );
    } else if(this.userRole === 'ROLE_LEAD'){
      this.leadService.getEmployeeByOneDriveUpdate(employee.employeeId).subscribe(
        response => {
          if (response.updateOneDrive) {
            this.redirectToOneDrive(response.oneDriveLink);
          } else {
            this.showUserNotAddedOneDriveMessage(employee);
          }
        },
        error => {
        }
      );
    }
  }

  handleLeadClick(lead: any) {
    const isCurrentUser = lead.userEmpId === this.currentUser.userEmpId;
  
    if (isCurrentUser) {
      this.leadService.getLeadData(lead.leadId).subscribe(
        response => {
          if (response.leadIsUpdateOneDrive) {
            this.redirectToOneDrive(response.leadOneDriveLink);
          } else {
            this.openOneDriveLeadSavePopup(lead);
          }
        },
        error => {
        }
      );
    } else if (this.userRole === 'ROLE_MEMBER') {
      this.leadService.getLeadData(lead.leadId).subscribe(
        response => {
          if (response.leadIsUpdateOneDrive) {
            this.redirectToOneDrive(response.leadOneDriveLink);
          } else {
            this.showLeadNotAddedOneDriveMessage(lead);
          }
        },
        error => {
        }
      );
    } else if(this.userRole === 'ROLE_LEAD'){
      this.leadService.getLeadData(lead.leadId).subscribe(
        response => {
          if (response.leadIsUpdateOneDrive) {
            this.redirectToOneDrive(response.LeadOneDriveLink);
          } else {
            this.showLeadNotAddedOneDriveMessage(lead);
          }
        },
        error => {
        }
      );
    }
  }
  
  showUserNotAddedOneDriveMessage(employee: any) {
    this.dialog.open(ErrorOnedriveComponent, {
      width: '400px',
      hasBackdrop: true,
      disableClose: false,
      autoFocus: false,
      data: { 
        employee: employee,
      }
    });
  }
  showLeadNotAddedOneDriveMessage(lead: any) {
    this.dialog.open(ErrorLeadOnedriveComponent, {
      width: '400px',
      hasBackdrop: true,
      disableClose: false,
      autoFocus: false,
      data: { 
        lead: lead,
      }
    });
  }

  

  redirectToOneDrive(oneDriveLink: string) {
    window.open(oneDriveLink, '_blank');
  }

  openOneDriveSavePopup(employee: any): void {
    const scrollStrategy = this.overlay.scrollStrategies.block();
    const dialogRef = this.dialog.open(OneDriveComponent, {
      width: '400px',
      hasBackdrop: true,
      disableClose: true,
      autoFocus: false,
      data: { employee: employee },
      scrollStrategy: scrollStrategy
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
      }
    });
  }

  openOneDriveLeadSavePopup(lead: any): void {
    const scrollStrategy = this.overlay.scrollStrategies.block();
    const dialogRef = this.dialog.open(LeadOnedriveComponentComponent, {
      width: '400px',
      hasBackdrop: true,
      disableClose: true,
      autoFocus: false,
      data: { lead: lead },
      scrollStrategy: scrollStrategy
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
      }
    });
  }


  getRole(): string {
    const roles = this.userData.roles;
    if (roles.includes('ROLE_ADMIN')) return 'Admin';
    if (roles.includes('ROLE_LEAD')) return 'Team Lead';
    return 'Team Member';
  }

  toggleProfileDropup() {
    this.isProfileDropupOpen = !this.isProfileDropupOpen;
  }

  getAllTrackers(){
    this.leadService.getAllTrackers().subscribe(
      res=>{
        this.trackers=res;
      }
    )
  }

  getCurrentLeadEmployees() {
    if (this.currentLeadId) {
      this.leadService.selectLead(this.currentLeadId).subscribe(
        (response) => {
          this.leadWithMappedEmployeeData = response;
        },
        (error) => {
          console.error('Error selecting lead:', error);
          this.leadWithMappedEmployeeData = []; 
        }
      );
    } else {
      console.error('Current lead ID is not set');
      this.leadWithMappedEmployeeData = []; 
    }
  }
  
}