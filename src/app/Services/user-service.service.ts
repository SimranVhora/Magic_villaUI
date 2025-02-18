import { Injectable } from '@angular/core';
import { HttpRequestService } from './http-service.service';
import { APIRequest, APIResponse } from '../Shared/Model/API.model';
import { APPLICATION_CheckUniqueUser_URL, APPLICATION_RegisteUser_URL } from '../Shared/Cosntents/constants';
import { ApiMethod } from '../enums/api-method';
import { RegisterUserModel } from '../Shared/Model/user/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpRequestService: HttpRequestService) { }
  CheckUniqueName(userName: string) {
    const apiReq: APIRequest = {
      apiMethod: ApiMethod.POST,
      url: APPLICATION_CheckUniqueUser_URL,
      requestBody: {
        username: userName
      }
    }
    this.httpRequestService.request(apiReq);
  }

  RegisterUser(modal: RegisterUserModel) {
    const apiReq: APIRequest = {
      apiMethod: ApiMethod.POST,
      url: APPLICATION_RegisteUser_URL,
      requestBody: {
        UserName: modal.UserName,
        Name: modal.Name,
        Password: modal.Password,
        Role: modal.Role
      }
    }
    return this.httpRequestService.request<APIResponse>(apiReq);
  }
}
