import { Component, signal, DestroyRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomValidators } from '../../../utils/validators';
import { Router, RouterLink } from '@angular/router';
import { APP_ROUTES } from '../../../Shared/Cosntents/app-route';
import { UserService } from '../../../Services/user-service.service';
import { RegisterUserModel } from '../../../Shared/Model/user/user.model';
import { TextboxComponent } from "../../../Shared/Component/textbox/textbox.component";
import { TextBoxType } from '../../../enums/component.enum';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from "../../../Shared/Component/button/button.component";
import { ButtonType, ButtonVariant } from '../../../enums/button.enum';
import { DropdownValue } from '../../../Shared/Component/interface/components';
import { DropDownComponent } from "../../../Shared/Component/drop-down/drop-down.component";

@Component({
  selector: 'app-register-user',
  imports: [ReactiveFormsModule, RouterLink, TextboxComponent, CommonModule, ButtonComponent, DropDownComponent],
  templateUrl: './register-user.component.html',
  styleUrl: './register-user.component.css'
})
export class RegisterUserComponent {
  textBoxType = TextBoxType;
  buttonType = ButtonType;
  buttonVariant = ButtonVariant;
  userRoleOptions: DropdownValue[] = [
    { id: 1, text: 'admin' },
    { id: 2, text: 'user' }
  ]

  appRoutes = APP_ROUTES;
  error = signal<string>("");
  registeForm: FormGroup = new FormGroup({});

  form: FormGroup = new FormGroup({});

  constructor(private userService: UserService, private routerService: Router, private destroyRef: DestroyRef, private _fb: FormBuilder) {

  }
  ngOnInit() {
    this.initForm();
  }
  initForm() {
    this.form = this._fb.group({
      userName: new FormControl("", Validators.required),
      name: new FormControl("", Validators.required),
      password: new FormControl("", [Validators.required, CustomValidators.passWordValidator()]),
      confirmPassword: new FormControl("", [Validators.required, CustomValidators.passwordsMatchValidator('password')]),
      userRole: new FormControl('', Validators.required)
    })
  }

  RegisterUser() {
    this.form.markAllAsTouched();
    Object.values(this.form.controls).forEach(control => control.markAsDirty());
    this.form.updateValueAndValidity();
    if (this.form.invalid) {
      return;
    }
    const userModel: RegisterUserModel = {
      UserName: this.form.get("userName")?.value,
      Name: this.form.get("name")?.value,
      Password: this.form.get("password")?.value,
      Role: this.form.get("userRole")?.value as 'admin' | 'user',
    }
    const subscribe = this.userService.RegisterUser(userModel).subscribe({
      next: (respnse: any) => {
        if (respnse && respnse.isSuccess) {
          this.routerService.navigate([APP_ROUTES.LOGIN]);
        }
      },
      error: (response) => {
        if (response && response?.error && !response.error?.isSuccess && Array.isArray(response.error?.errorMessages)) {
          this.error.set(response.error.errorMessages);
        }
      },
    })
    this.destroyRef.onDestroy(() => subscribe.unsubscribe());
  }
}
