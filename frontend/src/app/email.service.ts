import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  url = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  sendEmail(to: String, subject: String, body: String) {
    return this.http.post(`${this.url}/email`, { to, subject, body });
  }

  getEmailTemplates() {
    return this.http.get(`${this.url}/templates`);
  }

}
