import { ApplicationConfig, provideZoneChangeDetection, isDevMode, inject } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideServiceWorker } from '@angular/service-worker';
import { HTTP_INTERCEPTORS, HttpEvent, HttpHandlerFn, HttpRequest, provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { provideToastr, ToastrService } from 'ngx-toastr';
import { catchError, finalize, Observable } from 'rxjs';
import { APIRequest, APIResponse } from './Shared/Model/API.model';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { LoaderService } from './Services/loader-service.service';
import { LoggingInterceptorService } from './Services/logging-interceptor.service';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



export const appConfig: ApplicationConfig = {
  providers: [
    BrowserModule,
    BrowserAnimationsModule,
    provideZoneChangeDetection({ eventCoalescing: true }),
  provideRouter(routes),
  provideHttpClient(withInterceptorsFromDi()),
  {
    provide: HTTP_INTERCEPTORS,
    useClass: LoggingInterceptorService,
    multi: true,
  },
  provideToastr(),
  provideServiceWorker('ngsw-worker.js', {
    enabled: !isDevMode(),
    registrationStrategy: 'registerWhenStable:30000'
  }), provideServiceWorker('ngsw-worker.js', {
    enabled: !isDevMode(),
    registrationStrategy: 'registerWhenStable:30000'
  }), provideAnimationsAsync()]
};
