import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { UpdatepasswordComponent } from './authentication/updatepassword/updatepassword.component';
import { AdmindahshboardComponent } from './admin/admindahshboard/admindahshboard.component';
import { LeadnavComponent } from './Lead/leadnav/leadnav.component';
import { ErrorComponent } from './error/error/error.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path:'update-password',component:UpdatepasswordComponent},
  { path:'admin-dashboard',component:AdmindahshboardComponent},
  { path:'lead-dashboard',component:LeadnavComponent},
  { path: '**', component: ErrorComponent }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
