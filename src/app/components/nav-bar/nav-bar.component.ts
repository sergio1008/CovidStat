import { Component, OnInit } from '@angular/core';
import { CountriesService } from 'src/app/services/countries.service';
import { CountryModel } from 'src/app/models/country.model';
import { TotalesModel } from 'src/app/models/totales.model';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  data : Array<any>;
  countries : Array<CountryModel> = [];
  paises : Array<string> = [];
  totales:TotalesModel;
  totalesContagiados: number;
  totalesMuertes: number;
  totalesCurados: number;
  constructor(private countryService : CountriesService) { }

  ngOnInit() {
    this.obtenerData();
  }

  obtenerData = () => {
    this.countryService.getStats().subscribe((res)=>{
      this.data = res.data.covid19Stats;
      sessionStorage.setItem('covid19Stats', JSON.stringify(this.data));
    },(error)=>{

    })
  }

}
