import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  count = 0;
  url = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getAnalytics() {
    // we get the count variable from the json return
    this.http.get<AnalyticsResults>(`${this.url}/analytics`)
    .subscribe(
      data => {
        console.log(data);
        console.log('success');
        console.log(data.count);
        // data to 
        // type of data is an Array of dictionaries
        // we want to get the count variable from the dictionary
        // we can do this by using the key 'count'
        this.count = data.count;
      }
    );
    return this.count;
  }
        

}

export interface AnalyticsResults {
  count: number;
}