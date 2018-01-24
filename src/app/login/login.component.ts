import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../core/servies/notification.service';
import { AuthenService } from '../core/servies/authen.service';
import { MessageConstants } from '../core/common/message.constants';
import { UrlConstants } from '../core/common/url.constants';
import { Router } from '@angular/router';
import { log } from 'util';
import { Logs } from 'selenium-webdriver';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loading = false;
  model: any = {};
  returnUrl: string;
  constructor(private _authenService: AuthenService, private _notificationService: NotificationService,
    private _route: Router) { }

  ngOnInit() {
  }
  login() {
    this.loading = true;
    this._authenService.login(this.model.username, this.model.password).subscribe(data => {
      this._route.navigate([UrlConstants.HOME]);
    }, error => {
    
      this._notificationService.printErrorMessage(MessageConstants.SYSTEM_ERROR_MSG);
      this.loading = false;
    });
  }
}
