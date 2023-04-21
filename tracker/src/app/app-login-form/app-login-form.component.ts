import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-login-form',
  templateUrl: './app-login-form.component.html',
})
export class AppLoginFormComponent{

  email: string = '';
  password: string = '';
  hasError: boolean = false;
  @Output() loggedIn = new EventEmitter<boolean>();

  constructor(private afAuth: AngularFireAuth) { }

  onSignIn() {
    // Normally you would authenticate with your server here
    // but for this example, we'll just check if email and password are not empty
    // if (this.email !== '' && this.password !== '') {
    //   this.loggedIn.emit(true);
    //   console.log("Submitted! Logged In!")
    // }
    // else
    // {
    //   console.log("Invalid credentials!")
    // }
    this.afAuth.signInWithEmailAndPassword(this.email, this.password)
    .then(() => {
      this.hasError = false;
      this.loggedIn.emit(true);
    })
    .catch(error => {
      this.hasError = true;
      console.log(error.message)
    });
  }
}
