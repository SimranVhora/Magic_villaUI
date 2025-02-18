import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { LoaderService } from '../../../Services/loader-service.service';

@Component({
  selector: 'app-loader',
  imports: [CommonModule],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.css'
})
export class LoaderComponent implements OnInit {
  private _loadingSubject = new BehaviorSubject<boolean>(false);
  isLoading:boolean = false;
  constructor(private _loader: LoaderService,private changeDetectorRef:ChangeDetectorRef) {

  }
  ngOnInit(): void {
    this._loader._loaderState.subscribe({
      next: (loader) => {
        this.isLoading = loader;
        this.changeDetectorRef.detectChanges();
      }
    });
  }
}
