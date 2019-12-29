import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OvernightPage } from './overnight.page';

const routes: Routes = [
  {
    path: '',
    component: OvernightPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OvernightPageRoutingModule {}
