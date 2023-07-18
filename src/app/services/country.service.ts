import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Country } from '../types/types';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  url = 'https://restcountries.com/v3.1/lang/spanish';
  http = inject(HttpClient);

  getCountries(): Observable<any[]> {
    return this.http.get<any[]>(this.url).pipe(
      map((countries: Country[]) => {
        return countries.map((country: Country) => {
          return { name: country.name.common, code: country.cca3 };
        });
      })
    );
  }
}
