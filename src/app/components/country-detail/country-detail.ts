import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CountryService } from '../../services/country';
import { WeatherService } from '../../services/weather';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
 
@Component({
  selector: 'app-country-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './country-detail.html',
  styleUrl: './country-detail.css'
})
export class CountryDetail implements OnInit {
 
  country: any = null;
  weather: any = null;
  currencyName: string = '';
 
  constructor(
    private route: ActivatedRoute,
    private countryService: CountryService,
    private weatherService: WeatherService,
    private cd: ChangeDetectorRef
  ) {}
 
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const name = params.get('name');
 
      if (name) {
        this.countryService.getCountries().subscribe(data => {
 
          this.country = data.find(c =>
            c.name.common.toLowerCase().trim() === name.toLowerCase().trim()
          );
 
          // Currency
          if (this.country?.currencies) {
            const values: any[] = Object.values(this.country.currencies);
            this.currencyName = values[0]?.name || 'N/A';
          }
 
          // Reset weather
          this.weather = null;
 
          if (this.country) {
            const capital = this.country.capital?.[0];
 
            if (capital) {
              this.weatherService.getWeather(capital).subscribe({
                next: (w) => {
                  this.weather = w;
                  this.cd.detectChanges();
                },
                error: (err) => {
                  console.error('Weather error:', err);
                }
              });
            }
          }
        });
      }
    });
  }
}
 