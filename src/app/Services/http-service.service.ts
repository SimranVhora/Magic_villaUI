import { HttpClient, HttpContext, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { LocalStorageService } from './LocalStorage/local-storage.service';
import { LocalStorageType } from './LocalStorage/local-storage.enum';
import { ApiMethod } from '../enums/api-method';
import { ACCESS_TOKEN } from '../Shared/Cosntents/constants';
import { APIResponse, APIRequest } from '../Shared/Model/API.model';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestService {
  private _header: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/text' });

  constructor(private _http: HttpClient) {

  }
  // Method to dynamically set Authorization header
  private getHeader(customHeader?: HttpHeaders): HttpHeaders {
    if (customHeader)
      return customHeader;
    const token = LocalStorageService.getItem(LocalStorageType.LOCAL, ACCESS_TOKEN) || '';
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      'Cache-Control': 'no-cache',
    });
  }

  private convertParams(params: any): HttpParams {
    let httpParams = new HttpParams();
    if (params) {
      for (const key of Object.keys(params))
        httpParams = httpParams.set(key, params[key]?.toString());
    }
    return httpParams;
  }


  public request<APIResponse>(apiRequest:APIRequest): Observable<APIResponse> {
    let response: Observable<any>;
    const options = {
      headers: apiRequest.header ?? this.getHeader(),
      body: apiRequest.requestBody,
      params: this.convertParams(apiRequest.params),
      context: apiRequest.context,
      withCredentials: true
    };
    let reqObservable: Observable<any> =this._http.request<APIResponse>(apiRequest.apiMethod, apiRequest.url, options);
    response = reqObservable.pipe(
      map((resp: HttpResponse<any>) => {
        return resp;
      }),
      catchError((err: HttpErrorResponse) => {

        // return throwError(()=>{new Error(API_Error);} )
        throw err;
      })
    )
    return response;
  }

  // public get<T>(url: string, params?: any, header?: HttpHeaders, context?: HttpContext, responseType: 'json' | 'blob' | 'text' = 'json'): Observable<T> {
  //   return this._http.get<T>(url,
  //     {
  //       headers: header ?? this.getHeader(),
  //       params: this.convertParams(params),
  //       context: context,
  //       responseType: responseType as any
  //     }
  //   );
  // }

  // public getById<T>(url: string, id: string, params?: any): Observable<T> {
  //   return this._http.get<T>(url + "/" + id,
  //     {
  //       params: this.convertParams(params)
  //     });
  // }

  // public post<T>(url: string, body: object, params?: any, header?: HttpHeaders, context?: HttpContext): Observable<T> {
  //   return this._http.post<T>(url, body,
  //     {
  //       headers: header ?? this._header,
  //       params: this.convertParams(params),
  //       context: context
  //     });
  // }

  // public put<T>(url: string, body?: object, params?: any, header?: HttpHeaders, context?: HttpContext): Observable<T> {
  //   return this._http.put<T>(url, body,
  //     {
  //       headers: header ?? this._header,
  //       params: this.convertParams(params),
  //       context: context
  //     });
  // }


}
