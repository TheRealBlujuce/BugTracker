import { Component } from '@angular/core';
import { Bug } from './bug.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'bug-tracker';

  selectedBug: Bug | null = null;


  onBugSelected(bug: Bug) {
    this.selectedBug = bug;
  }
}
