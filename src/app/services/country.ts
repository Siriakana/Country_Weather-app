import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
 
@Injectable({ providedIn: 'root' })
export class CountryService {
  private http = inject(HttpClient);
 
  private api = 'https://restcountries.com/v3.1/all?fields=name,flags,region,capital,population,currencies';
 
  private cache: any[] = [];
 
  getCountries() {
    // Return cached data if already loaded
    if (this.cache.length > 0) {
      return of(this.cache);
    }
 
    return this.http.get<any[]>(this.api).pipe(
      tap(data => this.cache = data)
    );
  }
}