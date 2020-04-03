import { Component, OnInit, Input } from '@angular/core';
import { TotalesPaisModel } from 'src/app/models/totales-pais.model';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { DataCharModel } from 'src/app/models/data-chart.model';
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  @Input() labels: Array<string>;
  @Input () data : Array<TotalesPaisModel>;
  datos:Array<DataCharModel> = [];
  topFive: number = 6;
  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  constructor() { }

  ngOnInit() {
    this.sortData();
    this.calcularData();
  }
  public barChartLabels: Label[] = ['Infectados','Recuperados', 'Muertos'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];

  public barChartData: ChartDataSets[] = this.datos;

  calcularData = () => {
    for (let index = 0; index <= this.topFive ; index++) {
      this.datos.push({
        data  : [this.data[index].contagiados, this.data[index].curados, this.data[index].muertos],
        label : this.data[index].pais
      })
    }
  }

  sortData = () => {
    this.data.sort((a , b) => {return b.contagiados - a.contagiados});
  }
  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }
}
