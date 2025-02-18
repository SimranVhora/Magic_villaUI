import { inject, Injectable } from '@angular/core';
import { HttpRequestService } from './http-service.service';
import { APPLICATION_Login_URL } from '../Shared/Cosntents/constants';
import { APIResponse, APIRequest } from '../Shared/Model/API.model';
import { ApiMethod } from '../enums/api-method';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(private httpRequestService : HttpRequestService) { }
  login({ userName, password }: { userName: string; password: string }) {
    const apiReq:APIRequest={
      apiMethod : ApiMethod.POST,
      url:APPLICATION_Login_URL,
      requestBody:{
        username: userName,
        password: password
      }
    }
    return this.httpRequestService.request<APIResponse>(apiReq);
  }
}
