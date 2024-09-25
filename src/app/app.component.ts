import { Component, OnInit } from '@angular/core';
import { MessageConfig, MessageService } from './directives/message.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'cabbookingsystem-client';

  message: MessageConfig | null = null;
  private subscription: Subscription;

  constructor(private messageService: MessageService) {}

  ngOnInit() {
    this.subscription = this.messageService.message$.subscribe(
      message => {
        this.message = message;
        setTimeout(() => {
          this.message = null;
        }, 3000);
      }
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  
  }

