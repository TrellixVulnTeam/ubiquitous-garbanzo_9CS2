import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MailComponent } from './mail/mail.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AnalyticsComponent } from './analytics/analytics.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    MailComponent,
    AnalyticsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,  
    ReactiveFormsModule,
    AppRoutingModule,
    NgbModule
  ],

  providers: [],
  bootstrap: [AppComponent],
  exports: [AppRoutingModule, NgbModule]
})

export class AppModule {

 }
