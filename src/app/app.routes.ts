import { Routes } from '@angular/router';
import { APP_ROUTES } from './Shared/Cosntents/app-route';
import { LoginComponent } from './Pages/login/login.component';

export const routes: Routes = [
  {
    path: APP_ROUTES.EMPTY_ROUTE,
    component: LoginComponent,
  },
  // {
  //   path: APP_ROUTES.PAGE_ROUTE,
  //   loadChildren: () => import('@main/pages/pages.routes').then((r) => r.Routing),
  // },

];
