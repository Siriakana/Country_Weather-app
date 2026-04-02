import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
 
@Injectable({ providedIn: 'root' })
export class WeatherService {
  private http = inject(HttpClient);
 
  private apiKey = '2fb799d0a3f619c931ed42644e3e5d41';
 
  getWeather(city: string) {
    const encodedCity = encodeURIComponent(city);
 
    return this.http.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodedCity}&appid=${this.apiKey}&units=metric`
    );
  }
}