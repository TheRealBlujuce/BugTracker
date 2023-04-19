import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BugGridComponent } from './bug-grid/bug-grid.component';
import { BugDetailComponent } from './bug-detail/bug-detail.component';

const routes: Routes = [
  { path: 'bugs', component: BugGridComponent },
  { path: 'bugs/:id', component: BugDetailComponent },
  { path: '', redirectTo: '/bugs', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }