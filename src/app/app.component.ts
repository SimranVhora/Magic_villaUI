import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoaderComponent } from "./Shared/Component/loader/loader.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'magicVilla';
}
