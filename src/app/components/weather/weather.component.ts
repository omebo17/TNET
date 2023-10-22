import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, switchMap } from 'rxjs';
import { WeatherInfo } from 'src/app/interfaces/weather-info';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent {
  city: string = '';
  weatherForm: FormGroup;
  weatherData?: WeatherInfo | null;
  error: string | null = null;

  constructor(private fb: FormBuilder, private weatherService: WeatherService) {
    this.weatherForm = this.fb.group({
      city: ['']
    });
  }

  getWeather() {
    this.error = null;
    const cityControl = this.weatherForm.get('city');
    if (cityControl?.value) {
      const city = cityControl.value;
      this.weatherService.getWeatherByCity(city).subscribe({
        next: (response) => {
          this.weatherData = response;
        },
        error: (error) => {
          this.weatherData = null; 
          this.error = error.error.message;
          console.error('Error fetching weather data:', error);
        }
    });
    } else {
      this.error = 'City value is null or empty'; 
    }
  }

  getCurrentLocationWeather() {
    this.error = null;
    if (navigator.geolocation) {
      this.getLocation().pipe(
        switchMap( (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          return this.weatherService.getWeatherByCoordinates(latitude, longitude)
        })
        ).subscribe({
          next: (response) => {
            this.weatherData = response as WeatherInfo;
          },
          error: (error) => {
            console.error('Error fetching weather data for current location:', error);
            this.error = error.error.message;
          }
        })
    } else {
      console.error('Geolocation is not supported by your browser.');
    }
  }

  private getLocation(): Observable<any> {
    return new Observable(obs => {
     navigator.geolocation.getCurrentPosition(
       success => {
         obs.next(success);
         obs.complete();
       },
       error => {
         obs.error(error);
       }
     );
   });
   }
}
