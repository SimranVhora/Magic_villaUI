import { Component } from '@angular/core';
import { ACCESS_TOKEN } from '../../Shared/Cosntents/constants';
import { Router, RouterOutlet, RouterLink } from '@angular/router';
import { LocalStorageService } from '../../Services/LocalStorage/local-storage.service';
import { LocalStorageType } from '../../Services/LocalStorage/local-storage.enum';
import { APP_ROUTES } from '../../Shared/Cosntents/app-route';
import { LoaderComponent } from '../../Shared/Component/loader/loader.component';

@Component({
  selector: 'app-layout',
  imports: [RouterLink, RouterOutlet,LoaderComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  APP_ROUTES = APP_ROUTES;
  constructor(private routerService: Router) {

  }
  logout() {
    LocalStorageService.removeItem(LocalStorageType.LOCAL, ACCESS_TOKEN);
    this.routerService.navigateByUrl('login');
  }
}
