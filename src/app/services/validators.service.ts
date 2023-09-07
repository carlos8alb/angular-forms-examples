import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ValidatorsService {
  constructor() {}

  passwordsEquals(password1: string, password2: string) {
    return (control: AbstractControl): ValidationErrors | null => {
      const password1Value = control.get(password1)?.value;
      const password2Value = control.get(password2)?.value;

      if (password1Value !== password2Value) {
        control.get(password2)?.setErrors({ notEquals: true });
        return { notEquals: true };
      }

      return null;
    };
  }

  userExists(control: AbstractControl): Promise<any> | Observable<any> {
    if (!control.value) return Promise.resolve(null);

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'carlos8_alb') return resolve({ exist: true });
        return resolve(null);
      }, 1000);
    });
  }
}
