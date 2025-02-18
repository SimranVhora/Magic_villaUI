import { Component, Inject, input } from '@angular/core';
import { MatDialogModule,MAT_DIALOG_DATA , MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-dialog',
  imports: [MatDialogModule],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css'
})
export class DialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title:string,message: string; width: string,confirmText?: string; cancelText?: string }
  ) {}
  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
