import { Injectable } from '@angular/core';
import { HttpRequestService } from './http-service.service';
import { Villas, Villas_URL } from '../Shared/Cosntents/constants';
import { APIRequest, APIResponse } from '../Shared/Model/API.model';
import { ApiMethod } from '../enums/api-method';
import { Villa } from '../Pages/DTOs/villa.model';

@Injectable({
  providedIn: 'root'
})
export class VillasService {
  constructor(private httpRequestService:HttpRequestService) { }
  getVillas<APIResponse>(pageSize:Number=10,pageNumber:number=1,occupancy:string="",search:string="",){
    const apiReq:APIRequest={
          apiMethod : ApiMethod.GET,
          url:Villas_URL,
          params:{
            occupancy : occupancy,
            search : search,
            pageSize:pageSize,
            pageNumber:pageNumber
          }
        }
    return this.httpRequestService.request<APIResponse>(apiReq)
  }
  getVillaId<APIResponse>(id:number){
      const apiReq:APIRequest = {
        apiMethod : ApiMethod.GET,
        url: Villas_URL + "/" + id,
      }
      return this.httpRequestService.request<APIResponse>(apiReq);
  }
  checkVillaName<APIResponse>(name:string){
      const apiReq:APIRequest = {
        apiMethod : ApiMethod.GET,
        url: Villas.APPLICATION_IsUniqueName_URL,
        params:{
          villaName : name
        }
      }
      return this.httpRequestService.request<APIResponse>(apiReq);
  }
  createVillas<APIResponse>(modal:Villa){
      const apiReq:APIRequest = {
        apiMethod : ApiMethod.POST,
        url: Villas_URL,
        requestBody : modal
      }
      return this.httpRequestService.request<APIResponse>(apiReq);
  }
  editVillas<APIResponse>(modal:Villa){
      const apiReq:APIRequest = {
        apiMethod : ApiMethod.PUT,
        url: Villas_URL + "/" + modal.villaId,
        requestBody : modal
      }
      return this.httpRequestService.request<APIResponse>(apiReq);
  }
  deleteVillas<APIResponse>(villaId:number){
      const apiReq:APIRequest = {
        apiMethod : ApiMethod.DELETE,
        url: Villas_URL,
        params:{
          villaId : villaId
        }
      }
      return this.httpRequestService.request<APIResponse>(apiReq);
  }

  updateVillas<APIResponse>(villaId:Number,modal:Villa){
    const apiReq:APIRequest = {
      apiMethod : ApiMethod.POST,
      url: Villas_URL,
      params:villaId,
      requestBody : modal
    }
    return this.httpRequestService.request<APIResponse>(apiReq);
}
}
