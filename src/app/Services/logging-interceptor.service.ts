import { Injectable } from '@angular/core';
import { LoaderService } from './loader-service.service';
import { ToastrService } from 'ngx-toastr';
import { HttpEvent, HttpHandler, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { APIRequest, APIResponse } from '../Shared/Model/API.model';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, finalize } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoggingInterceptorService {

  constructor(private _loader:LoaderService,private _toastr:ToastrService) { }
  intercept(req: HttpRequest<APIRequest>, next: HttpHandler): Observable<HttpEvent<any>>{
    console.log(req);
    this._loader.showLoader();
    return next.handle(req).pipe(
      finalize(() => {
        this._loader.stopLoader();
      }),
      catchError((error: APIResponse) => {
        this._loader.showLoader();
        this._toastr.error(error.errorMessages, "Error");
        throw error;
      })
    );
  }
}
