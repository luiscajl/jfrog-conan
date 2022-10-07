import { Component, OnDestroy, OnInit } from '@angular/core';
import { Day } from './model/day.model';
import { WeatherService } from './service/weather.service';
import { MessageService } from 'primeng/api';

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  basicData: any;

  basicOptions: any;

  dataDays: Day[] = [];

  constructor(private weatherService: WeatherService, private messageService: MessageService) {

  }

  ngOnInit() {
    this.findLocation(); // TODO: Location is working by the browser, can be more powerful if you pass the coordinates to the backend and get the weather from there with accuracy
    this.weatherService.getAllWeatherDays().subscribe(
      data => {
        this.dataDays = data;
        this.fillBasicData();
      })

  }

  fillBasicData() {
    var now = new Date();
    var today = this.findDay(now.getUTCDate(), now.getUTCMonth() + 1, now.getFullYear(), this.dataDays);
    this.basicData = {
      labels: this.getWeek(),
      datasets: [
        {
          label: 'Mininum',
          backgroundColor: '#42A5F5',
          data: this.getMinimunTemperatures(today)
        },
        {
          label: 'Maximum',
          backgroundColor: '#FFA726',
          data: this.getMaximunTemperatures(today)
        }
      ]
    };
  }

  getWeek() {
    var now = new Date();
    var week = [];
    for (var i = now.getDay(); i < now.getDay() + 7; i++) {
      if (i > 6) {
        week.push(days[i - 7]);
      } else {
        week.push(days[i]);
      }
    }
    return week;
  }


  getMinimunTemperatures(today: Day) { //FIXME: This method is not working properly because does not contemplate the end of the month and the year
    var minTemps = [];
    minTemps.push(today.minimumTemperature);
    for (var i = 0; i < 6; i++) {
      var nextDay = this.findDay(today.day + i + 1, today.month, today.year, this.dataDays);
      if (nextDay) {
        minTemps.push(nextDay.minimumTemperature);
      }
    }
    return minTemps;
  }

  getMaximunTemperatures(today: Day) {
    var maxTemps = [];
    maxTemps.push(today.maximumTemperature);
    for (var i = 0; i < 6; i++) {
      var nextDay = this.findDay(today.day + i + 1, today.month, today.year, this.dataDays);
      if (nextDay) {
        maxTemps.push(nextDay.maximumTemperature);
      }
    }
    return maxTemps;

  }

  findDay(date: number, month: number, year: number, days: Day[]) {
    for (var i = 0; i < days.length; i++) {
      if (days[i].day == date && days[i].month == month && days[i].year == year) {
        return days[i];
      }
    }
    this.messageService.add({ severity: 'error', summary: 'Weather Service', detail: 'Today not found on the database' });
    throw new Error("Day not found");
  }

  findLocation() {
    let coords = { lat: 0, lng: 0 };
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        if (position.coords) {
          coords = { lat: position.coords.latitude, lng: position.coords.longitude };
          this.messageService.add({ severity: 'success', summary: 'Location Service', detail: 'You are on Latitude: ' + coords.lat + ' and Longitude: ' + coords.lng });
        } else {
          this.messageService.add({ severity: 'error', summary: 'Location Service', detail: 'You don´t give permission to get your location' });
        }
      });
    } else {
      this.messageService.add({ severity: 'error', summary: 'Location Service', detail: 'You don´t give permission to get your location' });
    }
  };


}

