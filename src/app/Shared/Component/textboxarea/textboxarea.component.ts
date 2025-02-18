import { Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ShowErrorComponent } from "../show-error/show-error.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-textboxarea',
  imports: [ShowErrorComponent,CommonModule,ReactiveFormsModule],
  templateUrl: './textboxarea.component.html',
  styleUrl: './textboxarea.component.css'
})
export class TextboxareaComponent {
  customClass =input<string>('form-control');
  id=input<string>();
  label=input<string>("'Text'");
  placeholder=input<string>("Text");
  control= input.required<FormControl | any>();
  hideLabel = input<boolean>(false);
  isRequired = input<boolean>(false);
  rows = input<number>(2);
  disable = input<boolean>(false);

  ngOnInit(){
    console.log(this.control());
    if(this.disable()){
      this.control().disable();
    }
    else{
      this.control().enable()
    }
  }
}
