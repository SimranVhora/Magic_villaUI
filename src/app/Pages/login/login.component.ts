import { afterNextRender, Component, OnInit, signal, viewChild, DestroyRef } from '@angular/core';
import { FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginServiceService } from '../../Services/login-service.service';
import { ACCESS_TOKEN } from '../../Shared/Cosntents/constants';
import { Route, Router, RouterLink } from '@angular/router';
import { APP_ROUTES } from '../../Shared/Cosntents/app-route';
import { LocalStorageService } from '../../Services/LocalStorage/local-storage.service';
import { LocalStorageType } from '../../Services/LocalStorage/local-storage.enum';
import { ErrorModalComponent } from '../error-modal/error-modal.component';
import { CommonModule } from '@angular/common';
import { TextboxComponent } from "../../Shared/Component/textbox/textbox.component";
import { ButtonComponent } from "../../Shared/Component/button/button.component";
import { ButtonType, ButtonVariant } from '../../enums/button.enum';
import { CustomValidators } from '../../utils/validators';
import { ToastrService} from 'ngx-toastr';
import {APIMessages } from '../../Shared/Cosntents/message-constants';
import { APIResponse } from '../../Shared/Model/API.model';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,
    ErrorModalComponent,
    CommonModule,
    ReactiveFormsModule,
    TextboxComponent,
    ButtonComponent,
    RouterLink,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  isFetching = signal(false);
  error = signal<string>("");
  buttonType = ButtonType;
  buttonVariant = ButtonVariant;
  form = new FormGroup({
    userNameR: new FormControl("", {
      validators: [Validators.required]
    }),
    passwordR: new FormControl("", {
      validators: [Validators.required,CustomValidators.passWordValidator()]
    })
  });
  // private form= viewChild<NgForm>('form');

  constructor(private loginServiceService: LoginServiceService,
    private routeService: Router,
     private destroyRef: DestroyRef,private toastr:ToastrService) {
    // afterNextRender(()=>{
    //   const subscription=this.form()?.valueChanges?.subscribe({
    //     next:(value)=>{
    //       console.log(value);
    //     }
    //   });
    //   this.destroyRef.onDestroy(()=>subscription?.unsubscribe());
    // });
  }
  ngOnInit() {
    this.isFetching.set(true);
    this.error.set("");
  }
  Login(formData: NgForm) {// userName: string, passWord: string

    if (formData.form.invalid) {
      return;
    }

    const subscribe = this.loginServiceService.login({ userName: formData.form.value.userName, password: formData.form.value.passWord }).subscribe
      ({
        next: (response: any) => {
          if (response && response?.isSuccess) {
            LocalStorageService.setItem(LocalStorageType.LOCAL, ACCESS_TOKEN, response?.result?.token);
            this.routeService.navigate([APP_ROUTES.LAYOUT,APP_ROUTES.HOME]);
            //this.routeService.navigateByUrl("/layout/home");
          }
        },
        error: (response) => {
          if (response && response?.error && !response.error?.isSuccess && Array.isArray(response.error?.errorMessages)) {
            this.error.set(response.error.errorMessages);
          }
        },
        complete: () => {
          this.isFetching.set(false);
        }
      });
    this.destroyRef.onDestroy(() => subscribe.unsubscribe());
    formData.form.reset();
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
        next: (response: APIResponse) => {
          if (response && response?.isSuccess) {
            LocalStorageService.setItem(LocalStorageType.LOCAL, ACCESS_TOKEN, response?.result?.token);
            this.routeService.navigate([APP_ROUTES.LAYOUT,APP_ROUTES.HOME]);
            this.toastr.success(APIMessages.Login);
            //this.routeService.navigateByUrl("/layout/home");
          }
        },
        error: (response) => {
          if (response && response?.error && !response.error?.isSuccess && Array.isArray(response.error?.errorMessages)) {
            this.error.set(response.error.errorMessages);
            this.toastr.error(response.error?.errorMessages);
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

  // get getPasswordIsValid() {
  //   return (this.form.controls.passwordR.touched &&
  //     this.form.controls.passwordR.dirty &&
  //     this.form.controls.passwordR.invalid);
  // }
}
