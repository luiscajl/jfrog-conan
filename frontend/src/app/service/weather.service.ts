import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Day } from '../model/day.model';

@Injectable({ providedIn: 'root' })
export class WeatherService {
  constructor(private httpClient: HttpClient) {


  }

  getAllWeatherDays(): Observable<any> {
    return this.httpClient.get('https://by13mn0h48.execute-api.eu-west-1.amazonaws.com/Prod/');
  }

}
