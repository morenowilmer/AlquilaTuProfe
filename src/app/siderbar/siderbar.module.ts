import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SiderbarRoutingModule } from './siderbar-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { SiderbarComponent } from './siderbar/siderbar.component';


@NgModule({
  declarations: [
    LayoutComponent,
    SiderbarComponent
  ],
  imports: [
    CommonModule,
    SiderbarRoutingModule
  ],
  exports:[
    LayoutComponent
  ]
})
export class SiderbarModule { }
