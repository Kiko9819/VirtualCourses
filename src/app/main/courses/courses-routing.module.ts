import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesComponent } from '@app/main/courses/courses.component';

const routes: Routes = [
  {
    path: '',
    component: CoursesComponent,

    // children: [
    //   {
    //     path: '',
    //     redirectTo: 'courses',
    //     pathMatch: 'full'
    //   },
    //   {
    //     path: 'courses',
    //     component: CoursesComponent
    //   }
    // ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoursesRoutingModule { }
