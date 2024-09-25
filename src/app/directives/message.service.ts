import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface MessageConfig {
  message: string;
  type: 'success' | 'error';
}

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private messageSubject = new Subject<MessageConfig>();
  message$ = this.messageSubject.asObservable();

  showMessage(config: MessageConfig) {
    this.messageSubject.next(config);
  }
}