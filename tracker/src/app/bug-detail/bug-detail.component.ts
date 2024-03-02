import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Bug } from '../bug.model';
import { BugService } from '../bug.service';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-bug-detail',
  templateUrl: './bug-detail.component.html',
  styleUrls: ['./bug-detail.component.css']
})
export class BugDetailComponent implements OnInit {

  // Define the selectedBug property to receive the selected bug from the bug-grid component
  @Input() selectedBug: Bug | null = null;
  @Input() previousBug: Bug | null = null;
  @Output() bugCreated = new EventEmitter<Bug>();
  @Output() isEditingBug = new EventEmitter<boolean>();

  newBug: Bug = {
    id: '',
    title: '',
    priority: '',
    dateCreated: new Date().toDateString(),
    addedBy: '',
    description: ''
  };

  isEditMode: boolean = false;
  isCreating: boolean = false;
  bugTitle: any = "";
  addedBy: any = "";
  bugPriority: any = "";
  bugDescription: any = "";


  constructor(private bugService: BugService) { }

  ngOnInit() {
  }

  createBug() {

    if(!this.isCreating)
    {
      if (this.previousBug == null || this.previousBug != null) {
        this.previousBug = this.selectedBug;
        // console.log(this.previousBug)
      }
      this.selectedBug = null;
      this.isCreating = true;
    }
    this.isEditingBug.emit(this.isCreating);

  }

  saveBug(form: NgForm) {

    if (form.invalid)
    {
      console.log("All fields must be filled out before submitting");
      return;
    }

    const today = new Date();
    if (this.isCreating) {
      this.newBug = {
        id: '',
        title: form.value.title,
        priority: form.value.priority,
        dateCreated: today.toDateString(),
        addedBy: form.value.addedBy,
        description: form.value.description
      };
      this.bugCreated.emit(this.newBug);
      this.bugService.addBug(this.newBug);
    }
    else if (this.selectedBug) {
      this.bugTitle = form.value.title;
      this.addedBy = form.value.addedBy;
      this.bugPriority = form.value.priority;
      if (form.value.description != null){
        this.bugDescription = form.value.description;
      }
      else
      {
        this.bugDescription = this.selectedBug.description;
      }

      this.newBug = {
        id: '',
        title: this.bugTitle,
        priority: this.bugPriority,
        dateCreated: this.selectedBug.dateCreated,
        addedBy: this.addedBy,
        description: this.bugDescription
      };

      this.bugCreated.emit(this.newBug);
      this.bugService.updateBug(this.selectedBug, this.newBug);

      this.selectedBug = this.newBug;
      // console.log(this.selectedBug);

    }
    this.isEditMode = false;
    this.isCreating = false;
    this.isEditingBug.emit(this.isEditMode)
  }

  deleteBug() {
    if (this.selectedBug) {
      this.bugService.deleteBug(this.selectedBug);
      this.selectedBug = null;
    }
  }

  editBug() {
    this.isEditMode = true;
    this.isEditingBug.emit(this.isEditMode);
  }

  cancelEdit()
  {
    if (this.isEditMode)
    { 
      this.isEditMode = false; 
      this.isEditingBug.emit(this.isEditMode);
    }
    
    if (this.isCreating)
    {
      this.isCreating = false;
      if (this.previousBug != null) 
      { 
        this.selectedBug = this.previousBug;
      }
      this.isEditingBug.emit(this.isCreating);
    }
    // console.log("Canceled Edit/Create Bug")
  }
  
}
