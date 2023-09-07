import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ValidatorsService } from 'src/app/services/validators.service';

@Component({
  selector: 'app-reactive',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css'],
})
export class ReactiveComponent {
  fb = inject(FormBuilder);
  validatorService = inject(ValidatorsService);
  form!: FormGroup;

  emailPattern = '[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$';

  constructor() {
    this.createForm();
    this.createListeners();
    this.loadDataInForm();
  }

  get hobbies() {
    return this.form.get('hobbies') as FormArray;
  }

  hasError(field: string): boolean | undefined {
    return this.form.get(field)?.invalid && this.form.get(field)?.touched;
  }

  passwordsNotEquals(): boolean | undefined {
    if (!this.form.get('password2')?.touched) return false;

    const password1 = this.form.get('password1')?.value;
    const password2 = this.form.get('password2')?.value;
    return password1 !== password2;
  }

  addHobby() {
    this.hobbies.push(this.fb.control('', Validators.required));
  }

  deleteHobby(i: number) {
    this.hobbies.removeAt(i);
  }

  save(): void {
    console.log(this.form);

    Object.values(this.form.controls).forEach((control) => {
      if (control instanceof FormGroup) {
        Object.values(control.controls).forEach((control) =>
          control.markAsTouched()
        );
      } else {
        control.markAsTouched();
      }
    });

    if (this.form.invalid) return;

    console.log(this.form.value);
    this.form.reset();
  }

  createForm() {
    this.form = this.fb.group(
      {
        name: ['', [Validators.required, Validators.minLength(5)]],
        lastName: ['', [Validators.required, Validators.minLength(5)]],
        email: [
          '',
          [Validators.required, Validators.pattern(this.emailPattern)],
        ],
        user: ['', , this.validatorService.userExists],
        address: this.fb.group({
          district: ['', Validators.required],
          city: ['', Validators.required],
        }),
        hobbies: this.fb.array([]),
        password1: ['', Validators.required],
        password2: ['', Validators.required],
      },
      {
        validators: this.validatorService.passwordsEquals(
          'password1',
          'password2'
        ),
      }
    );
  }

  loadDataInForm() {
    this.form.reset({
      name: 'Carlos',
      lastName: 'Albarracin',
      email: 'carlos8_alb@hotmail.com',
      address: {
        district: 'Santiago del Estero',
        city: 'La Banda',
      },
      password1: '123456',
      password2: '123456',
    });

    //['Hola', 'Chau'].forEach((item) =>
    //  this.hobbies.push(this.fb.control(item))
    //);
  }

  createListeners() {
    this.form.valueChanges.subscribe(console.log);
    this.form.statusChanges.subscribe(console.log);
    this.form.get('name')?.valueChanges.subscribe(console.log);
  }
}
