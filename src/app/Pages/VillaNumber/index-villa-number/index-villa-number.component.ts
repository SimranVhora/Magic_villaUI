import { VillanumbersService } from './../../../Services/villanumbers-service.service';
import { Component, signal, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { APP_ROUTES } from '../../../Shared/Cosntents/app-route';
import { VillaNumbers } from '../../DTOs/villa_number.model';
import { APIResponse } from '../../../Shared/Model/API.model';
import { Observable } from 'rxjs';
import { PageEvent, MatPaginatorModule } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../../Shared/Component/dialog/dialog.component';
import { APP_CONSTANTS } from '../../../Shared/Cosntents/message-constants';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-index-villa-number',
  standalone:true,
  imports: [RouterLink, MatPaginatorModule],
  templateUrl: './index-villa-number.component.html',
  styleUrl: './index-villa-number.component.css'
})
export class IndexVillaNumberComponent implements OnInit {
  APP_ROUTES = APP_ROUTES;
  villaNumbers = signal<VillaNumbers[]>([]);
  pageSize = signal<number>(5);
  pageIndex = signal<number>(1);
  totalCount = signal<number>(0);
  pageSizeOptions: number[] = [5, 10, 20, 50, 100];
  constructor(private _villanumbersService: VillanumbersService, private dialog: MatDialog, private toastr: ToastrService,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute
  ) {

  }
  ngOnInit(): void {
    this.route.params.subscribe(() => {
      this.getVillaNumber(this.pageSize(), this.pageIndex());
      this.cdr.detectChanges();
    });
  }
  getVillaNumber(pageSize: number, pageIndex: number) {
    const subscribe = this._villanumbersService.getVillaNumbers<APIResponse>().subscribe({
      next: (response: APIResponse) => {
        console.log(response);
        if (response && response.isSuccess && Array.isArray(response.result.villaNumbers)) {
          this.villaNumbers.set(response?.result?.villaNumbers as VillaNumbers[]);
          this.totalCount.set(response?.result?.totalCount || 0)
          if (this.pageSize() > this.totalCount())
            this.pageSize.set(this.totalCount());
        }
      }
    });
  }
  openCancelDialogbox(villaNumber: Number = 0) {
    console.log(villaNumber);
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '500px',
      data: { title: APP_CONSTANTS.DELETE_CONFIRM_TITLE, message: APP_CONSTANTS.DELETE_MESSAGE, confirmText: 'Yes', cancelText: 'No' }
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._villanumbersService.deleteVillaNumbers<APIResponse>(villaNumber).subscribe({
          next: (respone: APIResponse) => {
            if (respone && respone?.isSuccess) {
              this.toastr.success("Villa Deleted Successfully");
              this.getVillaNumber(this.pageSize(), this.pageIndex());
            }
          },
          error: (response) => {
            if (response && response?.error && Array.isArray(response.error?.errorMessages)) {
              this.toastr.error(response.error.errorMessages);
            }
          }
        })
      }
    });
  }

  log(event: PageEvent) {
    this.pageIndex.set(event.pageIndex);
    this.pageSize.set(event.pageSize);
    this.getVillaNumber(event.pageSize, event.pageIndex + 1);
  }
}
