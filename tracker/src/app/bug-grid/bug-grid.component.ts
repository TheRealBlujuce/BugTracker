import { Component, EventEmitter, OnInit, OnDestroy, Output, Input } from '@angular/core';
import { Bug } from '../bug.model';
import { BugService } from '../bug.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-bug-grid',
  templateUrl: './bug-grid.component.html',
  styleUrls: ['./bug-grid.component.css']
})
export class BugGridComponent implements OnInit, OnDestroy{

  @Output() bugSelected = new EventEmitter<Bug>();
  @Input() isEditing: boolean = false;

  bugs: Bug[] = [];
  private bugSubscription: Subscription = new Subscription;
    
  constructor(public bugService: BugService) { }

  ngOnInit() 
  {
    this.bugService.getBugs();
    this.bugSubscription = this.bugService.bugChangedEvent
    .subscribe(
      (bugs: Bug[]) => {
        this.bugs = bugs;
      })
  }

  ngOnDestroy() 
  {
      this.bugSubscription.unsubscribe();
  }

  // Define the onBugCardClick method to set the selected bug and show the detail view
  onBugCardClick(bug: Bug) 
  {
    if(!this.isEditing)
    {
      this.bugSelected.emit(bug); // Emit an event with the selected bug
    }
    
  }
}


