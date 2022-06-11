import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from '../analytics.service';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit {

  emailSentCounter: number = 0;

  constructor(private analyticService: AnalyticsService) { }

  ngOnInit(): void {
    this.updateEmailSentCounter();
  }
  // constantly load from db and update the counter
  updateEmailSentCounter() {
        this.emailSentCounter = this.analyticService.getAnalytics();
        console.log('updating email sent counter');
        console.log(this.analyticService.getAnalytics());
        setTimeout(() => {
          this.updateEmailSentCounter();
        } , 3000);
      }
  

}
