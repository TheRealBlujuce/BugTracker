import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-logout',
  templateUrl: './logout-button.component.html'
})
export class LogoutButtonComponent {
  @Output() logout = new EventEmitter<boolean>();

  logOut() {
    this.logout.emit(true);
  }
}