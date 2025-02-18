import { Component, signal, DestroyRef } from '@angular/core';
import { FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginServiceService } from '../../Services/login-service.service';
import { ACCESS_TOKEN } from '../../Shared/Cosntents/constants';
import { Router, RouterLink } from '@angular/router';
import { LocalStorageService } from '../../Services/LocalStorage/local-storage.service';
import { LocalStorageType } from '../../Services/LocalStorage/local-storage.enum';
import { CommonModule } from '@angular/common';
import { TextboxComponent } from "../../Shared/Component/textbox/textbox.component";
import { ButtonType, ButtonVariant } from '../../enums/button.enum';
import { CustomValidators } from '../../utils/validators';
import { TextBoxType } from '../../enums/component.enum';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login-rform',
  imports: [FormsModule,
    CommonModule,
    ReactiveFormsModule,
    TextboxComponent,
    RouterLink
  ],
  templateUrl: './login-rform.component.html',
  styleUrl: './login-rform.component.css'
})
export class LoginRFormComponent {
  isFetching = signal(false);
  error = signal<string>("");
  buttonType = ButtonType;
  buttonVariant = ButtonVariant;
  textBoxType = TextBoxType;
  form = new FormGroup({
    userNameR: new FormControl("", {
      validators: [Validators.required]
    }),
    passwordR: new FormControl("", {
      validators: [Validators.required, CustomValidators.passWordValidator()]
    })
  });

  constructor(private loginServiceService: LoginServiceService, private routeService: Router, private destroyRef: DestroyRef, private toastr: ToastrService) {

  }
  ngOnInit() {
    this.isFetching.set(true);
    this.error.set("");
  }

  onSubmit() {
    this.form.markAllAsTouched();
    Object.values(this.form.controls).forEach(control => control.markAsDirty());
    this.form.updateValueAndValidity();
    if (this.form.invalid) {
      return;
    }

    const subscribe = this.loginServiceService.login(
      {
        userName: this.form.value?.userNameR ?? '',
        password: this.form.value?.passwordR ?? ''
      }
    ).subscribe
      ({
        next: (response: any) => {
          if (response && response?.isSuccess) {
            LocalStorageService.setItem(LocalStorageType.LOCAL, ACCESS_TOKEN, response?.result?.token);
            this.routeService.navigateByUrl("/layout/home");
          }
        },
        error: (response) => {
          if (response && response?.error && !response.error?.isSuccess && Array.isArray(response.error?.errorMessages)) {
            this.error.set(response.error.errorMessages);
            this.toastr.error(response.error.errorMessages);
          }
        },
        complete: () => {
          this.isFetching.set(false);
        }
      });
    this.destroyRef.onDestroy(() => subscribe.unsubscribe());
    this.form.reset();
  }
  get getUserNameIsValid() {
    return (this.form.controls.userNameR.touched &&
      this.form.controls.userNameR.dirty &&
      this.form.controls.userNameR.invalid);
  }
}
