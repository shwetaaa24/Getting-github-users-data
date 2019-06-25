import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { UserService} from './services/user-service.service';
import { HttpClientModule } from '@angular/common/http';
// import { FlexLayoutModule } from '@angular/flex-layout';
import { FlexLayoutModule } from '@angular/flex-layout';
import {NgxPaginationModule} from 'ngx-pagination';
import { RouterModule, Routes } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FlexLayoutModule,
    NgxPaginationModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
