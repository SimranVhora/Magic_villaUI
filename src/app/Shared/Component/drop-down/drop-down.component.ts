import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ShowErrorComponent } from '../show-error/show-error.component';
import { DropdownValue } from '../interface/components';

@Component({
  selector: 'app-drop-down',
  imports: [ReactiveFormsModule,CommonModule,ShowErrorComponent],
  templateUrl: './drop-down.component.html',
  styleUrl: './drop-down.component.css'
})
export class DropDownComponent {
  hideLabel = input<boolean>(false);
  label = input.required<string>();
  id = input<string>();
  customeClass = input<string>("form-select");
  control = input.required<FormControl | any>();
  defaultOption = input<string>('Please select any option...');
  options = input.required<DropdownValue[]>();
}
