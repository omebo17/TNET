import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
    if (cityControl && cityControl.value) {
      const city = cityControl.value;
      this.weatherService.getWeatherByCity(city).subscribe(
        (response) => {
          this.weatherData = response;
        },
        (error) => {
          this.weatherData = null; 
          this.error = 'Invalid input';
          console.error('Error fetching weather data:', error);
        }
      );
    } else {
      this.error = 'City value is null or empty'; 
    }
  }

  getCurrentLocationWeather() {
    this.error = null;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
  
          this.weatherService.getWeatherByCoordinates(latitude, longitude).subscribe(
            (response) => {
              this.weatherData = response as WeatherInfo;
            },
            (error) => {
              console.error('Error fetching weather data for current location:', error);
            }
          );
        },
        (error) => {
          console.error('Error getting current location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by your browser.');
    }
  }
}
