import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminComponent} from '@app/main/admin/admin.component';

const coursesModule = () => import('../courses/courses.module').then(m => m.CoursesModule);

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,

    children: [
      {
        path: 'courses',
        loadChildren: coursesModule,
        data: {
          manageCourses: true
        }
        // TODO: Make sure to fix this
        // canLoad: [AdminGuard]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
