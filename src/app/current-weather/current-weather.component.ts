import { Component, OnInit } from '@angular/core';
import { ICurrentWeather } from '../models/interfaces';
import { WeatherService } from '../weather/weather.service';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.css']
})
export class CurrentWeatherComponent implements OnInit {
  currentWeather: ICurrentWeather;
  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    this.weatherService
      .getCurrentWeather('Seattle', 'US')
      .subscribe(data => {this.currentWeather = data; });
  }

}
