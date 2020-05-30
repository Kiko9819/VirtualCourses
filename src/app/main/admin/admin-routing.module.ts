import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminComponent} from '@app/main/admin/admin.component';
import {AdminGuard} from '@app/core/guards/admin.guard';
import {UsersComponent} from '@app/main/admin/users/users.component';

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
        },
        canLoad: [AdminGuard]
      },
      {
        path: 'users',
        component: UsersComponent,
        canLoad: [AdminGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
