import { Component, DestroyRef, Pipe, signal } from '@angular/core';
import { VillasService } from '../../../Services/villas.service';
import { APIResponse } from '../../../Shared/Model/API.model';
import { Villa } from '../../DTOs/villa.model';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Router, RouterLink } from '@angular/router';
import { APP_ROUTES } from '../../../Shared/Cosntents/app-route';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../../Shared/Component/dialog/dialog.component';
import { ToastrService } from 'ngx-toastr';
import { APP_CONSTANTS } from '../../../Shared/Cosntents/message-constants';

@Component({
  selector: 'app-index-villa',
  imports: [CurrencyPipe, MatPaginatorModule, CommonModule, RouterLink],
  templateUrl: './index-villa.component.html',
  styleUrl: './index-villa.component.css'
})
export class IndexVillaComponent {
  villas = signal<Villa[]>([])
  totalCount = signal<number>(0);
  pageSize = signal<number>(5);
  pageIndex = signal<number>(1);
  APP_ROUTES = APP_ROUTES;

  pageSizeOptions: number[] = [5, 10, 20, 50, 100];
  constructor(private villasService: VillasService,
    private destroyRef: DestroyRef,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private router:Router,
  ) {

  }
  ngOnInit() {
    this.getVillas(this.pageSize(), this.pageIndex());
  }
  getVillas(pageSize: number, pageIndex: number) {
    const subscribe = this.villasService.getVillas<APIResponse>(pageSize, pageIndex).subscribe({
      next: (response: APIResponse) => {
        if (response && response.isSuccess && Array.isArray(response.result?.villas)) {
          this.villas.set(response.result.villas as Villa[]);
          this.totalCount.set(response.result?.totalCount ?? 0);
          if (this.totalCount() < this.pageSize()) {
            this.pageSize.set(this.totalCount());
          }
        }
      }
    });
    this.destroyRef.onDestroy(() => subscribe.unsubscribe());
  }
  log(event: PageEvent) {
    this.pageIndex.set(event.pageIndex);
    this.pageSize.set(event.pageSize);
    this.getVillas(event.pageSize, event.pageIndex + 1);
  }
  openCancelDialogbox(id: number = 0) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '500px',
      data: { title: APP_CONSTANTS.DELETE_CONFIRM_TITLE, message: APP_CONSTANTS.DELETE_MESSAGE, confirmText: 'Yes', cancelText: 'No' }
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.villasService.deleteVillas<APIResponse>(id).subscribe({
          next: (respone: APIResponse) => {
            if (respone && respone?.isSuccess) {
              this.toastr.success("Villa Deleted Successfully");
              this.getVillas(this.pageSize(), this.pageIndex());
            }
          },
          error:(response)=>{
            if (response && response?.error && Array.isArray(response.error?.errorMessages)) {
              this.toastr.error(response.error.errorMessages);
            }
          }
        })
      }
    });
  }
  editVilla(villaId: number = 0) {
    let encryptVillaId=btoa(villaId.toString());
    this.router.navigateByUrl('/pages/createVilla/' + encryptVillaId);
    // this.router.navigate(['/',APP_ROUTES.LAYOUT,APP_ROUTES.EditVilla,villaId]);
  }
}
