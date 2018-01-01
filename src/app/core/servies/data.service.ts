import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { SystemConstants } from '../common/system.constants';
import { AuthenService } from '../servies/authen.service';
import {NotificationService} from '../servies/notification.service';
import {Observable} from 'rxjs/Observable';
import {MessageConstants} from '../common/message.constants';
import {UtilityService} from '../servies/utility.service';

@Injectable()
export class DataService {
  private headers: Headers;

  constructor(private _http: Http, private _router: Router, private _authenService: AuthenService
  ,private _notificationSevice: NotificationService, private _ultilitySevice: UtilityService) { }
  get(uri: string) {
    this.headers.delete("Authorization");
    this.headers.append("Authorization", "Bearer" + this._authenService.getLoggedInUser().access_token)
    return this._http.get(SystemConstants + uri, { headers: this.headers }).map(this.extraData);
  }
  post(uri: string, data?: any) {
    this.headers.delete("Authorization");
    this.headers.append("Authorization", "Bearer" + this._authenService.getLoggedInUser().access_token)
    return this._http.post(SystemConstants + uri, data, { headers: this.headers }).map(this.extraData);
  }
  put(uri: string, data?: any) {
    this.headers.delete("Authorization");
    this.headers.append("Authorization", "Bearer" + this._authenService.getLoggedInUser().access_token)
    return this._http.put(SystemConstants + uri, data, { headers: this.headers }).map(this.extraData);
  }
  delete(uri: string, key: string, id: string) {
    this.headers.delete("Authorization");
    this.headers.append("Authorization", "Bearer" + this._authenService.getLoggedInUser().access_token)
    return this._http.delete(SystemConstants + uri + '/?' + key + '=' + id, { headers: this.headers }).map(this.extraData);
  }
  postfile(uri: string, data?: any) {
    let newHeaders = new Headers();
    newHeaders.append("authorization", "Bearer" + this._authenService.getLoggedInUser().access_token);
    return this._http.post(SystemConstants.BASE_API + uri, data, { headers: newHeaders }).map(this.extraData);
  }
  private extraData(res: Response) {
    let body = res.json();
    return body || {};
  }

  public handleError(error:any){
    if (error==401){
      localStorage.removeItem(SystemConstants.CURRENT_USER);
      this._notificationSevice.printErrorMessage(MessageConstants.LOGIN_AGAIN_MSG);
      this._ultilitySevice.navigateToLogin();
    }
    else{
      let errMsg = (error.message)? error.message: error.status ? '${error.status} - ${error.statusText}': 'lỗi hệ thống';
      this._notificationSevice.printErrorMessage(errMsg);
      return Observable.throw(errMsg);
    }
  }
}
