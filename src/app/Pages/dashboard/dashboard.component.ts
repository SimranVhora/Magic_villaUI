import { Component } from '@angular/core';
import { ACCESS_TOKEN } from '../../Shared/Cosntents/constants';
import { Router, RouterLink } from '@angular/router';
import { APP_ROUTES } from '../../Shared/Cosntents/app-route';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  constructor(private routerService:Router){

  }
  logout(){
    localStorage.removeItem(ACCESS_TOKEN);
    this.routerService.navigateByUrl(APP_ROUTES.LOGIN);
  }
}
