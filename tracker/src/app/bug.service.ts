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

// import { Injectable, EventEmitter, Output } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Bug } from './bug.model';
// import { Observable, Subject } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class BugService {

//   bugposts: Bug[] = [];
//   private apiUrl = 'https://wdd430-b4295-default-rtdb.firebaseio.com/bugs.json';
//   @Output() bugChangedEvent = new Subject<Bug[]>();

//   constructor(private http: HttpClient) {
//     this.getBugs();
//   }

//   getBugs(){   
//       this.http.get<Bug[]>(this.apiUrl)
//           .subscribe( (bugs: Bug[]) => {
//           this.bugposts = bugs;

//           this.bugChangedEvent.next(this.bugposts);
//         },
//         // error method
//         (error: any) => {
//           console.error(error);
//         }
//       );
//   }

//   storeBugs(Bugs: Bug[]) {
//     const headers = new HttpHeaders({
//       'Content-Type': 'application/json'
//     });
//     this.http.put(this.apiUrl, JSON.stringify(Bugs), { headers }).subscribe(() => {
//       this.bugChangedEvent.next(this.bugposts);
//     });
//   }

//   deleteBug(Bug: Bug) {
//     if (!Bug) {
//       return;
//     }
//     const pos = this.bugposts.indexOf(Bug);
//     if (pos < 0) {
//       return;
//     }
//     this.bugposts.splice(pos, 1);
//     this.storeBugs(this.bugposts);
//   }

//   addBug(newBug: Bug) {
//     if (!newBug) {
//       return;
//     }
//     this.bugposts.push(newBug);
//     let BugsListClone = this.bugposts.slice();
//     this.storeBugs(BugsListClone);
//   }

//   updateBug(originalBug: Bug, newBug: Bug) {
//     if (!originalBug || !newBug) {
//       return;
//     }
//     let pos = this.bugposts.indexOf(originalBug);
//     if (pos < 0) {
//       return;
//     }
//     newBug.id = originalBug.id;
//     this.bugposts[pos] = newBug;
//     let BugsListClone = this.bugposts.slice();
//     this.storeBugs(BugsListClone);
//   }
// }
