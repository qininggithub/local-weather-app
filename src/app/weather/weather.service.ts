import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map, } from 'rxjs/operators';
import { ICurrentWeather } from '../models/interfaces';
import { environment } from '../../environments/environment';

interface ICurrentWeatherData {
  weather: [{
      description: string,
      icon: string
  }];
  main: {
    temp: number
  };
  sys: {
    country: string
  };
  dt: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  currentWeather: BehaviorSubject<ICurrentWeather> = new BehaviorSubject<ICurrentWeather> ({
    city: '--',
    country: '--',
    date: 0,
    image: '',
    temporature: 0,
    description: ''
  });

  constructor(private httpClient: HttpClient) { }

  getCurrentWeather(search: string | number, country: string): Observable<ICurrentWeather> {
    const uriParams = this.parseSearch(search, country);
    return this.httpClient.get<ICurrentWeatherData>(
      `${environment.weatherUrl}?` +
      `${uriParams}&appid=${environment.appId}`
    ).pipe(
      map((data) => (this.transformData(data)))
    );
  }

  private parseSearch(search: string | number, country: string): string {
    let uriParams = '';
    if (typeof search === 'string') {
      uriParams = `q=${search}`;
    } else {
      uriParams = `zip=${search}`;
    }

    if (country) {
      uriParams = `${uriParams}, ${country}`;
    }

    return uriParams;
  }

  private transformData(data: ICurrentWeatherData): ICurrentWeather {
    return {
      city: data.name,
      country: data.sys.country,
      date: data.dt * 1000,
      image: `http://openweathermap.org/img/w/${data.weather[0].icon}.png`,
      temporature: this.convertKelvinToFahrenheit(data.main.temp),
      description: data.weather[0].description
    } as ICurrentWeather;
  }

  private convertKelvinToFahrenheit(kelvin: number): number {
    return kelvin * 9 / 5 - 459.67;
  }
}
