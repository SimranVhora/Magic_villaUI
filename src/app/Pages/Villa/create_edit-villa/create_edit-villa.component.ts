import { Villa } from '../../DTOs/villa.model';
import { Component, signal, DestroyRef } from '@angular/core';
import { TextboxComponent } from "../../../Shared/Component/textbox/textbox.component";
import { TextBoxType } from '../../../enums/component.enum';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators, AsyncValidatorFn } from '@angular/forms';
import { TextboxareaComponent } from "../../../Shared/Component/textboxarea/textboxarea.component";
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { APP_ROUTES } from '../../../Shared/Cosntents/app-route';
import { VillasService } from '../../../Services/villas.service';
import { APIResponse } from '../../../Shared/Model/API.model';
import { ToastrService } from 'ngx-toastr';
import { APIMessages, VillaNotFound } from '../../../Shared/Cosntents/message-constants';
import { CustomValidators } from '../../../utils/validators';

@Component({
  selector: 'app-create-villa',
  imports: [TextboxComponent, ReactiveFormsModule, TextboxareaComponent, RouterLink],
  templateUrl: './create_edit-villa.component.html',
  styleUrl: './create_edit-villa.component.css'
})
export class CreateVillaComponent {
  textBoxType = TextBoxType;
  form: FormGroup = new FormGroup({});
  APP_ROUTES = APP_ROUTES;
  villaId = signal<number>(0);
  modalVilla!: Villa;

  constructor(private _fb: FormBuilder,
    private villasService: VillasService,
    private toastr: ToastrService,
    private routeService: Router,
    private router: ActivatedRoute,
    private destroyRef: DestroyRef
  ) {
  }
  ngOnInit() {
    let encryptedId = this.router.snapshot.paramMap.get('id')
    if (encryptedId) {
      this.villaId.set(parseInt(atob(encryptedId || "0")));
    }
    this.initForm(this.villaId());
    if (this.villaId() > 0) {
      console.log(this.villaId());
      this.loadVillaDetails();
    }
  }

  initForm(id: number) {
    this.form = this._fb.group({
      villaName: new FormControl("", {
        validators: [Validators.required],
        asyncValidators: [CustomValidators.villaNameExist(this.villasService)],
        updateOn: 'blur'
      }),
      Rate: new FormControl("0", Validators.required),
      VillaDescription: new FormControl(""),
      ImageURL: new FormControl("", CustomValidators.imageUrlValidator),
      Occupancy: new FormControl("", Validators.required),
      Sqft: new FormControl("", Validators.required),
      Amenity: new FormControl(""),
    });
  }
  loadVillaDetails() {
    const subscribe = this.villasService.getVillaId<APIResponse>(this.villaId()).subscribe({
      next: (response) => {
        if (response && response?.isSuccess && response?.result) {
          this.modalVilla = response?.result as Villa;
          if (this.modalVilla != null) {
            this.form.patchValue({
              villaName: this.modalVilla?.villaName,
              Rate: this.modalVilla.rate,
              VillaDescription: this.modalVilla.villaDescription,
              ImageURL: this.modalVilla.imageURL,
              Occupancy: this.modalVilla.occupancy,
              Sqft: this.modalVilla.sqft,
              Amenity: this.modalVilla.amenity,
            });
          }
          else {
            this.toastr.error(VillaNotFound);
            this.routeService.navigate(["/", APP_ROUTES.LAYOUT, APP_ROUTES.Villas])
          }
        }
      }
    });
    this.destroyRef.onDestroy(() => subscribe.unsubscribe())
  }
  createVilla() {
    if (!this.isFormValidation()) {
      return
    }
    this.createEditReq(this.getVillaModal(), true);
  }
  editVilla() {
    if (this.villaId() == 0) {
      this.toastr.error(VillaNotFound);
      this.routeService.navigate(["/", APP_ROUTES.LAYOUT, APP_ROUTES.Villas])
      return;
    }
    if (!this.isFormValidation()) {
      return
    }
    let modal = this.getVillaModal();
    modal.villaId = this.villaId();
    this.createEditReq(modal, false);
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

  getVillaModal(): Villa {
    const modalVilla: Villa = {
      villaName: this.form.get("villaName")?.value,
      villaDescription: this.form.get("VillaDescription")?.value,
      rate: this.form.get("Rate")?.value,
      sqft: this.form.get("Sqft")?.value,
      occupancy: this.form.get("Occupancy")?.value,
      imageURL: this.form.get("ImageURL")?.value,
      amenity: this.form.get("Amenity")?.value,
    }
    return modalVilla;
  }
  createEditReq(modal: Villa, isCreate: boolean) {
    let methodCall = (isCreate)
      ? this.villasService.createVillas(modal)
      : this.villasService.editVillas(modal);
    const subscribe = methodCall.subscribe({
      next: (response: any) => {
        if (response && response?.isSuccess) {
          this.routeService.navigate([APP_ROUTES.LAYOUT, APP_ROUTES.Villas]);
          this.toastr.success((isCreate) ? APIMessages.CreateVillaSuccess : APIMessages.UpdateVillaSuccess);
        }
      },
      error: (response) => {
        if (response && response?.error && Array.isArray(response.error?.errorMessages)) {
          this.toastr.error(response.error?.errorMessages);
        }
        console.log(response);
      }
    });
    this.destroyRef.onDestroy(() => subscribe.unsubscribe());
  }
}
