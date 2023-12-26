import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule } from '@angular/common/http';

import { TasklistComponent } from './tasklist/tasklist.component';
import { TaskService } from './task.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { ClientOrdersComponent } from './client-orders/client-orders.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    TasklistComponent,
    RegisterComponent,
    UserDashboardComponent,
    ClientOrdersComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    MainLayoutComponent,
    FormsModule,
    HttpClientModule,
    DragDropModule
  ],
  providers: [TaskService],
  bootstrap: [AppComponent]
})
export class AppModule { }
