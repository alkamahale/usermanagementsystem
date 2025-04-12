import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss']
})
export class UserDialogComponent {
  userForm: FormGroup;
  isEditMode: boolean;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEditMode = !!data;
    this.userForm = this.fb.group({
      first_name: [data?.first_name || '', Validators.required],
      last_name: [data?.last_name || '', Validators.required],
      email: [data?.email || '', [Validators.required, Validators.email]],
      avatar: [data?.avatar || ''],
    });
  }

  onSubmit() {
    if (this.userForm.invalid) return;
  
    this.dialogRef.close({
      id: this.data?.id,
      ...this.userForm.value
    });
  }
  

  onCancel() {
    this.dialogRef.close(null);
  }
}
