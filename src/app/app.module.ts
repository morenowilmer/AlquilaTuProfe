import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotFountComponent } from './not-fount/not-fount.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { LoginService } from './login/data/services/login.service';
import { SiderbarModule } from './siderbar/siderbar.module';
import { LoginInterceptor } from './login/login/login.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    NotFountComponent,
  ],
  imports: [
    BrowserModule,
    CoreModule,
    SharedModule,
    SiderbarModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    MatDatepickerModule,
    MatNativeDateModule,
    AppRoutingModule,
  ],
  providers: [
    LoginService,
    { provide: HTTP_INTERCEPTORS, useClass: LoginInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
