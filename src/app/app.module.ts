import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialogModule } from '@angular/material/dialog';
import { LoginComponent } from './authentication/login/login.component';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthGuard } from './auth.guard';
import { HomeNavComponent } from './authentication/home-nav/home-nav.component';
import { RouterModule } from '@angular/router';
import { authInterceptorProviders } from './_interceptor/auth.interceptor';
import { LeadComponent } from './Lead/lead/lead.component';
import { LeadnavComponent } from './Lead/leadnav/leadnav.component';
import { SearchbarComponent } from './Lead/searchbar/searchbar.component';
import { UpdatepasswordComponent } from './authentication/updatepassword/updatepassword.component';
import { AdmindahshboardComponent } from './admin/admindahshboard/admindahshboard.component';
import { PasswordStrengthDirective } from './directives/password-strength.directive';
import { AdminNavComponent } from './admin/admin-nav/admin-nav.component';
import { CreateuserComponent } from './admin/createuser/createuser.component';
import { MatChipsModule } from '@angular/material/chips';
import { DeleteUserComponent } from './admin/delete-user/delete-user.component';
import { AddLeadComponent } from './admin/add-lead/add-lead.component';
import { AddMemberComponent } from './admin/add-member/add-member.component';
import { LoaderComponent } from './shared/loader/loader.component';
import { MessagePopupComponent } from './directives/message-popup/message-popup.component';
import { ProfileComponent } from './directives/profile/profile.component';
import { ErrorComponent } from './error/error/error.component';
import { OneDriveComponent } from './Lead/one-drive/one-drive.component';
import { ErrorOnedriveComponent } from './Lead/error-onedrive/error-onedrive.component';
import { ErrorLeadOnedriveComponent } from './Lead/error-lead-onedrive/error-lead-onedrive.component';
import { LeadOnedriveComponentComponent } from './Lead/lead-onedrive-component/lead-onedrive-component.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeNavComponent,
    LeadComponent,
    LeadnavComponent,
    SearchbarComponent,
    UpdatepasswordComponent,
    AdmindahshboardComponent,
    CreateuserComponent,
    PasswordStrengthDirective,
    AdminNavComponent,
    DeleteUserComponent,
    AddLeadComponent,
    AddMemberComponent,
    LoaderComponent,
    MessagePopupComponent,
    ProfileComponent,
    ErrorComponent,
    OneDriveComponent,
    ErrorOnedriveComponent,
    ErrorLeadOnedriveComponent,
    LeadOnedriveComponentComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCardModule,
    MatTableModule,
    MatSelectModule,
    MatIconModule,
    MatDialogModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatExpansionModule,
    MatToolbarModule,
    MatMenuModule,
    MatListModule,
    MatSidenavModule,
    MatPaginatorModule,
    MatChipsModule,
  ],

  providers: [HttpClientModule, AuthGuard, authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
