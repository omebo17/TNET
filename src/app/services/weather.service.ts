import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WeatherInfo } from '../interfaces/weather-info';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiKey: string = '3e0a101feb1e25a93881dae4349da5fb';

  constructor(private http: HttpClient) {}

  getWeatherByCity(city: string): Observable<WeatherInfo> {
    const apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apiKey}&units=metric`;
    return this.http.get<WeatherInfo>(apiUrl);
  }

  getWeatherByCoordinates(latitude: number, longitude: number): Observable<WeatherInfo> {
    const apiUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${this.apiKey}&units=metric`;
    return this.http.get<WeatherInfo>(apiUrl);
  }

}
