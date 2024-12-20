import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SiderbarRoutingModule } from './siderbar-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { AppBreadcrumbService } from './services/app.breadcrumb.service';
import { MenuService } from './services/app.menu.service';
import { DashboardService } from './services/dashboard.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SidebarComponent } from './siderbar/siderbar.component';

// Material
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatBadgeModule} from '@angular/material/badge';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    LayoutComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatCardModule,
    MatIconModule,
    MatMenuModule,
    MatListModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatToolbarModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatBadgeModule,
    MatTooltipModule,

    SharedModule,

    SiderbarRoutingModule
  ],
  exports:[
    LayoutComponent
  ],
  providers: [
    AppBreadcrumbService,
    DashboardService,
    MenuService
  ],
  // schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SiderbarModule { }
