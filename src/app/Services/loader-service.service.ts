import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService{
  private _loaderSubject = new BehaviorSubject<boolean>(false);
   _loaderState = this._loaderSubject.asObservable();
  constructor() { }
  showLoader() {
    this._loaderSubject.next(true);
  }
  stopLoader() {
    this._loaderSubject.next(false);
  }
}
