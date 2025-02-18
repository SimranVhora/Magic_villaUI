import { Component, EventEmitter, input, output } from '@angular/core';
import { ButtonSize, ButtonType, ButtonVariant } from '../../../enums/button.enum';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {
  type = input.required<ButtonType>();
  title = input.required<string>();
  icon = input<string>();
  variant = input<ButtonVariant>();
  size = input<ButtonSize>(ButtonSize.Default);
  disabled = input<boolean>(false);
  onButtonClick = output<any>();
  handleClick(event:Event):void{
    if(!this.disabled()){
      this.onButtonClick.emit(event);
    }
  }
}
