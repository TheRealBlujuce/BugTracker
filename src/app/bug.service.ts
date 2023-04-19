import { Injectable, Output } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Bug } from './bug.model';
import {Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BugService {

  bugposts: Bug[] = [];
  private bugsRef: AngularFireList<Bug>;
  @Output() bugChangedEvent = new Subject<Bug[]>();

  constructor(private db: AngularFireDatabase ) {
    this.bugsRef = db.list<Bug>('bugs');
    this.getBugs();
  }

  getBugs(){
    
    this.bugsRef.valueChanges()
    .subscribe((bugs: Bug[]) => {
      this.bugposts = bugs
      this.bugChangedEvent.next(this.bugposts);
    });
  }

  addBug(bug: Bug): void {
    const key = this.db.createPushId();
    // Set the $key property of the bug object
    bug.id = key.toString();
    // Save the bug object in the Firebase Realtime Database
    this.db.object(`bugs/${key}`).set(bug);
  }

  updateBug(bug: Bug, newBug: Bug): void {
    newBug.id = bug.id;
    this.bugsRef.update(bug.id, newBug);
  }

  deleteBug(bug: Bug): void {
    const key = bug.id;
    this.db.object(`bugs/${key}`).remove();
  }
}

// import { Injectable, Output } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Bug } from './bug.model';
// import { Subject } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class BugService {

//   bugposts: Bug[] = [];
//   private apiUrl = 'mongodb://willmarda:Icu4MongoDBAtlas@localhost:3000/Bugs'; // replace with your server URL
//   @Output() bugChangedEvent = new Subject<Bug[]>();

//   constructor(private http: HttpClient) {
//     this.getBugs();
//   }

//   getBugs() {
//     this.http.get<Bug[]>(`${this.apiUrl}/bugposts`)
//       .subscribe((bugs: Bug[]) => {
//         this.bugposts = bugs;
//         this.bugChangedEvent.next(this.bugposts);
//       });
//   }

//   addBug(bug: Bug): void {
//     this.http.post(`${this.apiUrl}/bugposts`, bug)
//       .subscribe(() => {
//         this.getBugs();
//       });
//   }

//   updateBug(bug: Bug, newBug: Bug): void {
//     this.http.put(`${this.apiUrl}/bugposts/${bug.id}`, newBug)
//       .subscribe(() => {
//         this.getBugs();
//       });
//   }

//   deleteBug(bug: Bug): void {
//     this.http.delete(`${this.apiUrl}/bugposts/${bug.id}`)
//       .subscribe(() => {
//         this.getBugs();
//       });
//   }
// }
