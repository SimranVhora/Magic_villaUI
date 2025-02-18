import { Injectable } from '@angular/core';
import { HttpRequestService } from './http-service.service';
import { APIResponse, APIRequest } from '../Shared/Model/API.model';
import { APPLICATION_VillaNumbersAPI, VillaNumbers_URL } from '../Shared/Cosntents/constants';
import { ApiMethod } from '../enums/api-method';
import { ManageVillaNumbersDTO, VillaNumbers } from '../Pages/DTOs/villa_number.model';

@Injectable({
  providedIn: 'root'
})
export class VillanumbersService {

  constructor(private _httpHequest: HttpRequestService) { }

  getVillaNumbers<APIResponse>(pageSize: Number = 10, pageNumber: number = 1) {
    const _req: APIRequest = {
      apiMethod: ApiMethod.GET,
      url: VillaNumbers_URL,
      params: {
        pageSize: pageSize,
        pageNumber: pageNumber
      }
    }
    return this._httpHequest.request<APIResponse>(_req);
  }
  checkVillaNumbers<APIResponse>(villaNumber: string) {
    const apiReq: APIRequest = {
      apiMethod: ApiMethod.GET,
      url:APPLICATION_VillaNumbersAPI.APPLICATION_GetVillas_URL,
      params: {
        villaNo: villaNumber
      }
    }
    return this._httpHequest.request<APIResponse>(apiReq);
  }

  createVillaNumbers<APIResponse>(modal: ManageVillaNumbersDTO) {
    const _req: APIRequest = {
      apiMethod: ApiMethod.POST,
      url: VillaNumbers_URL,
      requestBody: modal,
    }
    return this._httpHequest.request<APIResponse>(_req);
  }
  editVillaNumbers<APIResponse>(villaNo: Number, modal: VillaNumbers) {
    const _req: APIRequest = {
      apiMethod: ApiMethod.PUT,
      url: VillaNumbers_URL,
      requestBody: {
        villaNo: villaNo,
        villaNumberUpdateDTO: modal
      },
    }
    return this._httpHequest.request<APIResponse>(_req);
  }
  deleteVillaNumbers<APIResponse>(villaNo: Number) {
    const _req: APIRequest = {
      apiMethod: ApiMethod.DELETE,
      url: VillaNumbers_URL + '/' + villaNo
    }
    return this._httpHequest.request<APIResponse>(_req);
  }
}
