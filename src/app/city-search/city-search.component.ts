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
  @Output() searchEvent = new EventEmitter<string>();

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    this.search.valueChanges
      .pipe(debounceTime(1000))
      .subscribe((searchValue: string) => {
        if (!this.search.invalid) {
          this.searchEvent.emit(searchValue);
        }
      }
    );
  }
}
