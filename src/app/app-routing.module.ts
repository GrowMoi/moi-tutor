import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './guards/login.guard';
import { NotloginGuard } from './guards/notlogin.guard';
import { HomePage } from './home/home.page';
import { HomePageModule } from './home/home.module';

const routes: Routes = [
  {
    path: 'tutor',
    component: HomePage,
    canActivate: [LoginGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardPageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
      },
    ]
  },
  // {
  //   path: 'intro',
  //   loadChildren: () => import('./intro/intro.module').then( m => m.IntroPageModule)
  // },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule),
    canActivate: [NotloginGuard]
  },
  {
    path: 'tutor',
    redirectTo: 'tutor/dashboard',
    pathMatch: 'full'
  },
  {
    path: '',
    redirectTo: 'tutor/dashboard',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    HomePageModule,
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
