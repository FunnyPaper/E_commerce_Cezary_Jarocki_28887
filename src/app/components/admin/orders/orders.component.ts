import { MainService } from 'src/app/services/main.service';
import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  constructor(public mainService: MainService) {}

  ngOnInit(): void {
    const promise = this.mainService.getOrders();
    promise.then((data: any) => {
      this.updateYearMonth();
    });
    this.showUpdateOptions();
  }

  // tslint:disable-next-line: member-ordering
  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
     },
    }
  };
  // tslint:disable-next-line: member-ordering
  public barChartLabels: Label[] = [];
  // tslint:disable-next-line: member-ordering
  public barChartType: ChartType = 'bar'; public barChartLegend = true;
  // tslint:disable-next-line: member-ordering
  public barChartPlugins = [ChartDataLabels];
  // tslint:disable-next-line: member-ordering
  public barChartData: ChartDataSets[] = [
    { data: [], label: 'Ilość zamówień' },
    { data: [], label: 'Wartość zamówień' }
  ];
  // events
  public chartClicked({ event, active }: {
    event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }
  public chartHovered({ event, active }: {
    event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }
  // funkcje do aktualizowania charta
  public updateYearMonthDay(): void {
    this.updateChart(1);
  }
  public updateYearMonth(): void {
    this.updateChart(2);
  }
  public updateYear(): void {
    this.updateChart(3);
  }
  // oto co dzieje się za sceną, pewnie da się to zrobić lepiej ale no napewno ogarniam mapy
  private updateChart(option: any): void {
    const map = new Map();
    this.barChartLabels = [];
    const data = [];
    const price = [];
    for (const order of this.mainService.orders?.orders) {
      const date = order.date_end.split('-');
      let myDate;
      switch (option) {
        case 1: myDate = date[0] + '/' + date[1] + '/' + date[2];
                break;
        case 2: myDate = date[0] + '/' + date[1];
                break;
        case 3: myDate = date[0];
                break;
      }
      if (!map.has(myDate)){
          map.set(myDate, true);
          this.barChartLabels.push(myDate);
          let orderCount = 0;
          let orderPrice = 0;
          for (const o of this.mainService.orders?.orders) {
            const dateCheck = o.date_end.split('-');
            let myDateCheck;
            switch (option) {
              case 1: myDateCheck = dateCheck[0] + '/' + dateCheck[1] + '/' + dateCheck[2];
                      break;
              case 2: myDateCheck = dateCheck[0] + '/' + dateCheck[1];
                      break;
              case 3: myDateCheck = dateCheck[0];
                      break;
            }
            if (myDateCheck === myDate) {
              orderCount += 1;
              orderPrice += parseFloat(o.price);
            }
          }
          data.push(orderCount);
          price.push(Math.ceil(orderPrice * 100) / 100);
      }
    }
    this.barChartData[0].data = data;
    this.barChartData[1].data = price;
  }
  showUpdateOptions(): void {
    const d = document.getElementById('side_buttons');
    if (d?.style.display === 'none') {
      // tslint:disable-next-line: no-non-null-assertion
      d!.style.display = 'flex';
    } else {
      // tslint:disable-next-line: no-non-null-assertion
      d!.style.display = 'none';
    }
  }
}
