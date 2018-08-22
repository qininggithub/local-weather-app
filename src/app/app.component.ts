import { Component } from '@angular/core';
import { WeatherService } from './weather/weather.service';
import { ICurrentWeather } from './models/interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'localcast-weather';
  searchResult: ICurrentWeather;

  constructor(private weatherService: WeatherService) {}

  doSearch(searchValue: string) {
    const userInput = searchValue.split(',').map(s => s.trim());
    this.weatherService.getCurrentWeather(userInput[0], userInput[1])
      .subscribe(data => this.searchResult = data);
  }
}
