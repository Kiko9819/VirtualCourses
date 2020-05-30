import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { HomeComponent } from './home/home.component';
import { AdminGuard } from '@app/core/guards/admin.guard';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { MyFavoritesComponent } from './my-favorites/my-favorites.component';

const adminModule = () => import('./admin/admin.module').then(m => m.AdminModule);
const coursesModule = () => import('./courses/courses.module').then(m => m.CoursesModule);

const routes: Routes = [
  {
    path: '',
    component: MainComponent,

    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'courses',
        loadChildren: coursesModule,
        data: {
          manageCourses: false
        }
      },
      {
        path: 'admin',
        loadChildren: adminModule,
        data: {
          listSelected: false
        },
        canLoad: [AdminGuard]
      },
      {
        path: 'my-profile',
        component: MyProfileComponent
      },
      {
        path: 'my-favorites',
        component: MyFavoritesComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule { }
