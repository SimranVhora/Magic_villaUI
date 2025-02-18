import { Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ShowErrorComponent } from "../show-error/show-error.component";
import { CommonModule } from '@angular/common';
import { TextBoxType } from '../../../enums/component.enum';

@Component({
  selector: 'app-textbox',
  imports: [ReactiveFormsModule, ShowErrorComponent,CommonModule],
  templateUrl: './textbox.component.html',
  styleUrl: './textbox.component.css'
})
export class TextboxComponent {
  type =input.required<TextBoxType>();
  customClass =input<string>('form-control');
  id=input<string>();
  label=input<string>("'Text'");
  placeholder=input<string>("Text");
  control=input.required<FormControl | any>();
  hideLabel = input<boolean>(false);
  isRequired = input<boolean>(false);
  disable = input<boolean>(false);

  ngOnInit(){
    if(this.disable()){
      this.control().disable();
    }
    else{
      this.control().enable()
    }
  }
}
