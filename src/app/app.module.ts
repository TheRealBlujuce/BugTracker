import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BugGridComponent } from './bug-grid/bug-grid.component';
import { BugDetailComponent } from './bug-detail/bug-detail.component';
import { HttpClientModule } from '@angular/common/http';
import { BugService } from './bug.service';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';


const firebaseConfig = {

  apiKey: "AIzaSyBK6-On6hJWOvkt246K06O9LU_zu_9UWtU",
  authDomain: "wdd430-b4295.firebaseapp.com",
  databaseURL: "https://wdd430-b4295-default-rtdb.firebaseio.com",
  projectId: "wdd430-b4295",
  storageBucket: "wdd430-b4295.appspot.com",
  messagingSenderId: "288535704920",
  appId: "1:288535704920:web:9909167c1a007006a7212d",

};

@NgModule({
  declarations: [
    AppComponent,
    BugGridComponent,
    BugDetailComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
  ],
  providers: [BugService],
  bootstrap: [AppComponent]
})
export class AppModule { 

  constructor() {
    const app = initializeApp(firebaseConfig);
    const db = getDatabase(app);
  }
}
