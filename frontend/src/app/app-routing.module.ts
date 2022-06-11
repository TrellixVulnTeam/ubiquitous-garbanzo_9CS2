import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AnalyticsComponent } from './analytics/analytics.component';
import { MailComponent } from './mail/mail.component';

const routes: Routes = [
  { path: 'mail', component: MailComponent },
  { path: 'analytics', component: AnalyticsComponent },
  { path: '', redirectTo: 'mail', pathMatch: 'full' }
  
];

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: 'mail', component: MailComponent },
      { path: 'analytics', component: AnalyticsComponent, },
      { path: '', redirectTo: 'mail', pathMatch: 'full' },
      { path: '**', redirectTo: 'mail' }
    ])
    ],
  exports: [RouterModule]
})
export class AppRoutingModule { }