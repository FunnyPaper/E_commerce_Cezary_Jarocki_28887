import { MainService } from 'src/app/services/main.service';
import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/interfaces/IProduct';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IProductData } from 'src/app/interfaces/IProductData';

@Component({
    selector: 'app-adm-products',
    templateUrl: './adm-products.component.html',
    styleUrls: ['./adm-products.component.scss'],
})
export class AdmProductsComponent implements OnInit {
    hidden: boolean = true;
    form: FormGroup = this.builder.group({
        thumbnail: ['', Validators.required],
        title: ['', Validators.required],
        price: ['', Validators.required],
        category: ['', Validators.required],
    });
    private $products!: Observable<IProduct[]>;

    constructor(
        private mainService: MainService,
        private builder: FormBuilder
    ) {}

    ngOnInit(): void {
        this.$products = this.mainService.$Products;
    }

    removeProduct(id: number): void {
        this.mainService.removeProduct(id);
    }

    submit(): void {
        this.mainService.addProduct(this.form.value as IProductData);
    }

    hide(): void {
        this.hidden = !this.hidden;
        const hidden = document.getElementById('hide');
        const d = document.getElementById('products-table');
        if (d?.style.display === 'none') {
            d!.style.display = 'flex';
            hidden!.innerText = 'Ukryj produkty';
        } else {
            d!.style.display = 'none';
            hidden!.innerText = 'Pokaż produkty';
        }
    }

    get $Products() {
        return this.$products;
    }
}
