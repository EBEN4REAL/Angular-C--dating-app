import { CanDeactivateFn } from '@angular/router';
import { MemberEditComponent } from '../members/member-edit/member-edit.component';
import { inject } from '@angular/core';
import { ConfirmService } from '../_services/confirm.service';
import { of } from 'rxjs';

export const preventUnsavedChangesGuard: CanDeactivateFn<MemberEditComponent> = (component) => {
  const confirmService = inject(ConfirmService);
  
  if (component.editForm?.dirty) {
    return confirmService.confirm();
  }
  
  return of(true);
};