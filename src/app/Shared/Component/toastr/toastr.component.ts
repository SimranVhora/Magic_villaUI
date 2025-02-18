import { Component, input } from '@angular/core';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-toastr',
  imports: [],
  templateUrl: './toastr.component.html',
  styleUrl: './toastr.component.css'
})
export class ToastrComponent {
 message= input<string>("");
 type= input< 'success' | 'error' | 'info' | 'warning'>( 'success');
 constructor(private toastr: ToastrService) {}

 ngOnInit(): void {
   this.showToast();
 }

 showToast(): void {
   switch (this.type()) {
     case "success":
       this.toastr.success(this.message());
       break;
     case 'error':
       this.toastr.error(this.message());
       break;
     case 'info':
       this.toastr.info(this.message());
       break;
     case 'warning':
       this.toastr.warning(this.message());
       break;
     default:
       this.toastr.show(this.message());
       break;
   }
 }
}
