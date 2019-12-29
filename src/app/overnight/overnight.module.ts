import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OvernightPageRoutingModule } from './overnight-routing.module';

import { OvernightPage } from './overnight.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OvernightPageRoutingModule
  ],
  declarations: [OvernightPage]
})
export class OvernightPageModule {}
