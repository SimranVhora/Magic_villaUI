import { Component, input, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-show-error',
  imports: [ReactiveFormsModule],
  templateUrl: './show-error.component.html',
  styleUrl: './show-error.component.css'
})
export class ShowErrorComponent  {
  control = input.required<any>();
  label = input.required<string>();

  ngOnInit(){
  }

  ERROR_MESSAGE:any={
    required:()=>`*${this.label()} is required`,
    invalidPassword: () =>
      '* Password must be at least 8 characters long, and include at least one uppercase letter, one lowercase letter, one number, and one special character.',
    passwordsDontMatch:()=>
      '* Passwords do not match',
    invalidImageUrl:()=>
      '* Invalid image Url',
    villaNameExists:()=>
      '* Villa name already exists.',
    villaNumberExists:()=>
      '* Villa number already exists.'
  }
  listOfErrors(): string[] {
    let errorMessageFn;
    if (this.control()?.errors) {
      return Object?.keys(this.control()?.errors).map((err) =>
        (this.ERROR_MESSAGE && this.ERROR_MESSAGE[err]) ? this.ERROR_MESSAGE[err](this.control().getError(err)) : `* Unknown error: ${err}`
      );
    } else return [];
  }
}
