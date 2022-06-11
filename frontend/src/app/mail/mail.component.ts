import { Component, NgModule, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { EmailService } from '../email.service';

@Component({
  selector: 'app-mail',
  templateUrl: './mail.component.html',
  styleUrls: ['./mail.component.css']
})

export class MailComponent implements OnInit {
  
  
  formBuilder = new FormBuilder();

  form = this.formBuilder.group({
        to: '',
        subject: '',
        body: ''
      });
  http!: HttpClient;

    constructor(
       formBuilder: FormBuilder,
        private emailService: EmailService,
       ) { }
  
    ngOnInit() {
    }

    onSubmit() : void {
      console.log(this.form.value);
      // we send post request to backend localhost:3000/api/mail
      if (this.form.valid) {
        console.log('form is valid');
      }
      var dict = this.form.value;
      // if web server is running on localhost:3000
      // ping localhost:3000/api/mail
      if (dict.to == "") {
        console.log('to is empty');
      }
      if (dict.subject == "") { 
        console.log('subject is empty');
      }
      if (dict.body == "") {
        console.log('body is empty');
      }
      this.emailService.sendEmail(dict.to, dict.subject, dict.body)
      .subscribe(
        data => {
          console.log(data);
          console.log('success');
          // Alert if sent successfully
          alert("Email sent successfully!");
          this.form.reset();
        }
      );
      
    }
}