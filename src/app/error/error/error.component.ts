import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';
import { TokenStorageService } from 'src/app/services/token-storage.service';
  @Component({
    selector: 'app-error',
    templateUrl: './error.component.html',
    styleUrls: ['./error.component.css'],
    animations: [
      trigger('fadeIn', [
        transition(':enter', [
          style({ opacity: 0 }),
          animate('300ms', style({ opacity: 1 })),
        ]),
      ]),
    ],
  })
  export class ErrorComponent implements OnInit {

    constructor(private router: Router, private tokenStorageService: TokenStorageService,) {}

    ngOnInit(): void {
    }
  
    goHome(): void {
      this.tokenStorageService.signOut();
      sessionStorage.clear();
      this.router.navigate(['/login']);
    }

  }
