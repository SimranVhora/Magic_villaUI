import { Component, OnInit, DestroyRef } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { TextboxComponent } from "../../../Shared/Component/textbox/textbox.component";
import { TextBoxType } from '../../../enums/component.enum';
import { TextboxareaComponent } from "../../../Shared/Component/textboxarea/textboxarea.component";
import { DropDownComponent } from "../../../Shared/Component/drop-down/drop-down.component";
import { DropdownValue } from '../../../Shared/Component/interface/components';
import { VillasService } from '../../../Services/villas.service';
import { VillanumbersService } from '../../../Services/villanumbers-service.service';
import { APIResponse } from '../../../Shared/Model/API.model';
import { Villa } from '../../DTOs/villa.model';
import { ManageVillaNumbersDTO, VillaNumbers } from '../../DTOs/villa_number.model';
import { ToastrService } from 'ngx-toastr';
import { APIMessages } from '../../../Shared/Cosntents/message-constants';
import { catchError } from 'rxjs';
import { Router, RouterLink } from '@angular/router';
import { APP_ROUTES } from '../../../Shared/Cosntents/app-route';
import { CustomValidators } from '../../../utils/validators';

@Component({
  selector: 'app-create-edit-villa-number',
  standalone:true,
  imports: [ReactiveFormsModule, TextboxComponent, TextboxareaComponent, DropDownComponent,RouterLink],
  templateUrl: './create-edit-villa-number.component.html',
  styleUrl: './create-edit-villa-number.component.css'
})
export class CreateEditVillaNumberComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  textBoxType = TextBoxType;
  villaOption: DropdownValue[] = [];
  APP_ROUTES=APP_ROUTES;
  constructor(private _fb: FormBuilder, private _villasService: VillasService, private _villanumbersService: VillanumbersService,
    private destroyRef: DestroyRef,private toastr:ToastrService,private router:Router
  ) {


  }
  ngOnInit(): void {
    this.initForm();
    this.setVills();
  }
  setVills() {
    const subscribe = this._villasService.getVillas<APIResponse>(2000, 1).subscribe({
      next: (response: APIResponse) => {
        if (response && response.isSuccess && Array.isArray(response.result?.villas)) {

          this.villaOption = (response.result.villas as Villa[]).map((villa: Villa) => ({
            id: villa.villaId,
            text: villa.villaName
          }));
        }
      }
    });
    this.destroyRef.onDestroy(() => subscribe.unsubscribe());
  }
  initForm() {
    this.form = this._fb.group({
      villaNumber: new FormControl("",{
        validators: [Validators.required,Validators.min(0)],
                asyncValidators: [CustomValidators.villaNumberExist(this._villanumbersService)],
                updateOn: 'blur'
      }),
      specialDetails: new FormControl("", Validators.required),
      villaIdSelect: new FormControl("", Validators.required),
    });
  }
  createVillaNumber() {
    if (!this.isFormValidation()) {
      return;
    }
    const subscribe = this._villanumbersService.createVillaNumbers<APIResponse>(this.getVillaModal()).subscribe({
      next: (respose: APIResponse) => {
        if (respose && respose.isSuccess) {
          this.toastr.success(APIMessages.CreateVillaNumberSuccess);
          this.router.navigate(['/',APP_ROUTES.LAYOUT,APP_ROUTES.VillaNumber]);
        }
      },
      error:(response:APIResponse)=>{
        if (response && !response.isSuccess && Array.isArray(response.errorMessages)) {
          this.toastr.error(response?.errorMessages[0]);
        }
      }
    });
    this.destroyRef.onDestroy(() => { subscribe.unsubscribe() })
  }

  isFormValidation(): boolean {
    this.form.markAllAsTouched();
    Object.values(this.form.controls).forEach(control => control.markAsDirty());
    this.form.updateValueAndValidity();
    if (this.form.invalid) {
      return false;
    }
    return true;
  }
  getVillaModal(): ManageVillaNumbersDTO {
    const modalVilla: ManageVillaNumbersDTO = {
      villaNo: this.form.get("villaNumber")?.value,
      specialDetails: this.form.get("specialDetails")?.value,
      villaId: this.form.get("villaIdSelect")?.value,
    }
    return modalVilla;
  }
}
