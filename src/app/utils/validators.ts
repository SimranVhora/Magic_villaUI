import { AbstractControl, AsyncValidatorFn, ValidationErrors, ValidatorFn } from "@angular/forms";
import { VillasService } from '../Services/villas.service';
import { catchError, debounceTime, lastValueFrom, map, Observable, of, switchMap } from 'rxjs';
import { APIResponse } from "../Shared/Model/API.model";
import { VillanumbersService } from "../Services/villanumbers-service.service";

export class CustomValidators {
  /**
     * Validator to check if password and confirm password fields match.
     */
  static passwordsMatchValidator(passwordKey: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.parent) return null; // Wait until parent is initialized
      const confirmPassword = control.value;
      const password = control.parent.get(passwordKey)?.value;

      if (password !== confirmPassword) {
        return { passwordsDontMatch: true };
      } else {
        return null;
      }
    };
  }

  static passWordValidator(): ValidatorFn {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!control.value) {
        return null;
      }
      if (control.value && !passwordRegex.test(control.value)) {
        return { invalidPassword: true };
      }
      return null;
    };
  }
  static imageUrlValidator(): ValidatorFn {
    const imgUrlRegex = /(https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|svg))$/i;
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!control.value) {
        return null;
      }
      if (control.value && imgUrlRegex.test(control.value)) {
        return { invalidImageUrl: true };
      }
      return null;
    };
  }
  static villaNameExist(villasService: VillasService): AsyncValidatorFn {
    return (control: AbstractControl): any => {
      if (!control.value) {
        return of(null);
      }
      return lastValueFrom(villasService.checkVillaName<APIResponse>(control.value))
      .then((response) => {
        return response && response.isSuccess && response.result ? { villaNameExists: true } : null;
      })
      .catch(() => null);
    };
  }
  static villaNumberExist(villasNumberService: VillanumbersService): AsyncValidatorFn {
    return (control: AbstractControl): any => {
      if (!control.value) {
        return of(null);
      }
      return lastValueFrom(villasNumberService.checkVillaNumbers<APIResponse>(control.value))
      .then((response) => {
        return response && response.isSuccess && response.result ? { villaNumberExists: true } : null;
      })
      .catch(() => null);
    };
  }
}
