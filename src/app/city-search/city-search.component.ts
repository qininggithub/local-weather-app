import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { WeatherService } from '../weather/weather.service';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-city-search',
  templateUrl: './city-search.component.html',
  styleUrls: ['./city-search.component.css']
})
export class CitySearchComponent implements OnInit {
  search = new FormControl();
  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    this.search.valueChanges
      .pipe(debounceTime(1000))
      .subscribe((searchValue: string) => {
        const userInput = searchValue.split(',').map(s => s.trim());
        this.weatherService.getCurrentWeather(userInput[0], userInput[1])
          .subscribe(data => {
            console.log(data);
            this.weatherService.currentWeather.next(data);
          });
      }
    );
  }
}
