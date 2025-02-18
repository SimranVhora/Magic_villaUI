import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { ModalComponent } from "../modal.component";
import { ErrorService } from '../../Services/error.service';

@Component({
    selector: 'app-error-modal',
    standalone: true,
    templateUrl: './error-modal.component.html',
    styleUrl: './error-modal.component.css',
    imports: [ModalComponent],
    changeDetection:ChangeDetectionStrategy.OnPush
})
export class ErrorModalComponent {
  title = input<string>();
  message = input<string>();
  private errorService = inject(ErrorService);

  onClearError() {
    this.errorService.clearError();
  }
}
