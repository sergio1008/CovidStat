import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CountryModel } from '../models/country.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'x-rapidapi-host': 'covid-19-coronavirus-statistics.p.rapidapi.com',
    'x-rapidapi-key': 'c5bdf77f06msh4c446babb9e6ce1p101099jsna54281b589d5'
  })
};

@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  private url:string = 'https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/stats';

  constructor(private http: HttpClient) { }

  /**
   * Obtener estadisticas
   */
  getStats = ():Observable<any> => {
    return this.http.get(this.url, httpOptions).pipe(map( res => res))
  }
  getStatsByCountry = (country: string):Observable<any> => {
    return this.http.get(`${this.url}?country=${country}`, httpOptions).pipe(map( res => res))
  }
}
