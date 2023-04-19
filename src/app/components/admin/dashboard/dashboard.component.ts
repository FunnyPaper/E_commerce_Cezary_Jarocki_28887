import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';
import { Observable, Subscription } from 'rxjs';
import { IOrder } from 'src/app/interfaces/IOrder';
import { OrderService } from 'src/app/services/order.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
    hidden: boolean = true;
    private $orders!: Observable<IOrder[]>;
    private subscriptions!: Subscription;
    constructor(private orderService: OrderService) {
        this.subscriptions = new Subscription();
        this.$orders = this.orderService.$Orders;
    }

    ngOnInit(): void {
        this.updateYearMonth();
        this.showUpdateOptions();
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    public barChartOptions: ChartOptions = {
        responsive: true,
        scales: { xAxes: [{}], yAxes: [{}] },
        plugins: {
            datalabels: {
                anchor: 'end',
                align: 'end',
            },
        },
    };

    public barChartLabels: Label[] = [];
    public barChartType: ChartType = 'bar';
    public barChartLegend = true;
    public barChartPlugins = [ChartDataLabels];
    public barChartData: ChartDataSets[] = [
        { data: [], label: 'Ilość zamówień' },
        { data: [], label: 'Wartość zamówień' },
    ];

    // funkcje do aktualizowania charta
    public updateYearMonthDay(): void {
        this.updateChart('day', 'month', 'year');
    }
    public updateYearMonth(): void {
        this.updateChart('month', 'year');
    }
    public updateYear(): void {
        this.updateChart('year');
    }

    private updateChart(...option: ('day' | 'month' | 'year')[]): void {
        const options = option.map((o) => ({ [o]: 'numeric' }));
        const format = function (date: Date, separator: string) {
            return options
                .map((m) => date.toLocaleString(undefined, m))
                .join(separator);
        };

        this.subscriptions.add(
            this.$orders.subscribe((orders) => {
                let mapping = orders.reduce<
                    Map<string, { count: number; price: number }>
                >((prev, curr) => {
                    let date = format(new Date(curr.date), '/');
                    if (!prev.has(date)) {
                        prev.set(date, { count: 1, price: this.orderPrice(curr) });
                    } else {
                        let order = prev.get(date)!;
                        order.count++;
                        order.price += this.orderPrice(curr);
                    }
                    return prev;
                }, new Map<string, { count: number; price: number }>());
                this.barChartLabels = [];
                this.barChartData.forEach((d) => (d.data = []));
                mapping.forEach((value, key) => {
                    this.barChartLabels.push(key);
                    this.barChartData[0].data?.push(value.count);
                    this.barChartData[1].data?.push(value.price);
                });
            })
        );
    }

    showUpdateOptions(): void {
        this.hidden = !this.hidden;
    }

    orderPrice(order: IOrder) {
        return order.products.reduce((price, p) => price + p.price, 0);
    }
}
