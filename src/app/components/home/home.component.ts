import { Component, OnInit } from '@angular/core';
import { CountryModel } from 'src/app/models/country.model';
import { FormControl } from '@angular/forms';
import { CountriesService } from 'src/app/services/countries.service';
import { NgxSpinnerService } from "ngx-spinner";
import { TotalesModel } from 'src/app/models/totales.model';
import { TotalesPaisModel } from 'src/app/models/totales-pais.model';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  countries: Array<CountryModel> = [];
  dataPais :Array<any>;
  data :Array<any>;
  showData:boolean =false;
  pais = new FormControl('');
  paisesDetail:Array<TotalesPaisModel> = [];
  paisDetail:TotalesPaisModel;
  dateUpdate : Date;
  info:Array<any> = [];
  paises : Array<string> = [];
  totales:TotalesModel;
  totalesContagiados: number = 0;
  totalesMuertes: number = 0;
  totalesCurados: number = 0;

  constructor(
    private countryService : CountriesService,
    private spinner : NgxSpinnerService ) { }

  ngOnInit() {
    this.spinner.show();
    this.data = JSON.parse(sessionStorage.getItem('covid19Stats'));
    this.processData();
    this.spinner.hide();
  }
  /**
   * 
   */
  obtenerInfo = () =>{
    this.showData = false;
    this.spinner.show();
    this.countryService.getStatsByCountry(this.pais.value).subscribe((res)=>{
      this.dateUpdate = res.data.lastChecked;
      this.info = res.data.covid19Stats;
      this.getPaisDetail();
      this.showData = true;
      this.spinner.hide();
    },(error)=>{
      this.spinner.hide();
    });
  }

  getPaisDetail = () => {
    this.paisDetail = this.paisesDetail.find(p => p.pais == this.pais.value);
  }
  /**
   * 
   */
   processData = () => {
    this.data.forEach( data =>{
      this.totalesContagiados += data.confirmed;
      this.totalesMuertes += data.deaths;
      this.totalesCurados += data.recovered;

      if(!this.paises.includes(data.country)){
        this.paises.push(data.country);
        this.countries.push({
          id : data.country,
          name: data.country
        });
        this.paisesDetail.push({
          pais : data.country,
          contagiados: data.confirmed,
          muertos:data.deaths,
          curados :data.recovered
        });
      } else {
       let pais:TotalesPaisModel =  this.paisesDetail.find(el => el.pais == data.country);
       let idx = this.paisesDetail.indexOf(pais);
        
       pais.contagiados = (pais.contagiados ? pais.contagiados:0) + data.confirmed;
       pais.muertos = (pais.muertos ? pais.muertos:0) + data.deaths;
       pais.curados = (pais.curados ? pais.curados:0) + data.recovered;        
       this.paisesDetail[idx] = pais;
      }
      console.log("paises:", this.paisesDetail);
    });
    
    this.totales  = {
      contagiados : this.totalesContagiados,
      muertos : this.totalesMuertes,
      curados : this.totalesCurados
    }
   }

}
