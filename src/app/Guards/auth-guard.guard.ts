import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ACCESS_TOKEN } from '../Shared/Cosntents/constants';
import { LocalStorageService } from '../Services/LocalStorage/local-storage.service';
import { LocalStorageType } from '../Services/LocalStorage/local-storage.enum';
import { APP_ROUTES } from '../Shared/Cosntents/app-route';
import { ToastrService  } from 'ngx-toastr';

export const authGuard: CanActivateFn = (route, state) => {
  const routerService = inject(Router);
  const toastr = inject(ToastrService);
  const loggedInUserToken = LocalStorageService.getItem(LocalStorageType.LOCAL, ACCESS_TOKEN);

  if (loggedInUserToken) {
    const tokenPayload = parseJwt(loggedInUserToken);
    const currentTime = Math.floor(Date.now() / 1000);
    if (tokenPayload && tokenPayload.exp && tokenPayload.exp > currentTime) {
      return true;
    }
    toastr.error("Session expired. Please log in again.", "Error");
    routerService.navigateByUrl(APP_ROUTES.LOGIN);
    return false;
  } else {
    routerService.navigateByUrl(APP_ROUTES.LOGIN);
    return false;
  }
  // Function to decode JWT token
  function parseJwt(token: string): any {
    try {
      const base64Url = token.split('.')[1]; // Get payload part
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      return JSON.parse(atob(base64)); // Decode and parse JSON
    } catch (error) {
      return null;
    }
  }
};
