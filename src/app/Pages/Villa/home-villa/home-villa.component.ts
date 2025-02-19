import { Component, DestroyRef, NgModule, signal } from '@angular/core';
import { VillasService } from '../../../Services/villas.service';
import { APIResponse } from '../../../Shared/Model/API.model';
import { Villa } from '../../DTOs/villa.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-villa',
  templateUrl: './home-villa.component.html',
  styleUrl: './home-villa.component.css',
  imports:[CommonModule],
  standalone:true,
})
export class HomeVillaComponent {
  villas= signal<Villa[]>([])
  constructor(private villasService: VillasService, private destroyRef: DestroyRef) {

  }
  ngOnInit() {
    this.getVillas();
  }
  getVillas() {
    const subscribe = this.villasService.getVillas<APIResponse>().subscribe({
      next: (response: APIResponse) => {
        if (response && response.isSuccess && Array.isArray(response.result?.villas)) {
          this.villas.set(response.result?.villas as Villa[]);
        }
      }
    });
    this.destroyRef.onDestroy(()=>subscribe.unsubscribe());
  }
}
