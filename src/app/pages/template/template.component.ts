import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { CountryService } from 'src/app/services/country.service';
import { CountryResults } from 'src/app/types/types';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-template',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css'],
})
export class TemplateComponent implements OnInit {
  countryService = inject(CountryService);

  user = {
    name: 'Carlos',
    lastname: 'Albarracin',
    email: 'carlos8_alb@hotmail.com',
    country: 'ARG',
    gender: 'M'
  };

  emailPattern = '[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$';

  countries$!: Observable<any[]>;
  defaultOption: CountryResults[] = [{ name: '[Select a country]', code: '' }]

  ngOnInit(): void {
    this.countries$ = this.countryService
      .getCountries()
      .pipe(
        map((countries: CountryResults[]) => this.defaultOption.concat(countries))
      );
  }

  save(form: NgForm): void {
    Object.values(form.controls).forEach((control) => {
      control.markAsTouched();
    });

    if (form.invalid) return;

    console.log(form.value);
  }
}
