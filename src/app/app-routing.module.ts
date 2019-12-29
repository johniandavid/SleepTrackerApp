import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)},
  {
    path: 'overnight',
    loadChildren: () => import('./overnight/overnight.module').then( m => m.OvernightPageModule)
  },
  {
    path: 'sleepiness',
    loadChildren: () => import('./sleepiness/sleepiness.module').then( m => m.SleepinessPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
