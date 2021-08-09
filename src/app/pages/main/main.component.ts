import { Component, OnInit } from '@angular/core'
import { ProductsService } from '../../services/products/products.service'
import { CartService } from '../../services/cart/cart.service'
import { Cart } from '../../interfaces/cart'
import { forkJoin } from 'rxjs'
import { DiscountService } from '../../services/discount/discount.service'

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styles: []
})
export class MainComponent implements OnInit {
    public products: Array<Cart> = []
    public page: number = 1
    public count: number = 0
    public totalRegister: number = 0
    public hasPrevPage: boolean = false
    public hasNextPage: boolean = false

    constructor(public _productService: ProductsService, private _cartService: CartService, public _discountService: DiscountService) {}

    ngOnInit() {
        this.getData()
    }

    // get products and discounts
    private getData(page: number = 1): void {
        forkJoin([<any>this._productService.getProducts(page), this._discountService.getDiscounts()]).subscribe(
            ([{ count, page, hasPrevPage, hasNextPage, totalDocs, products }, discounts]: Array<any>) => {
                this.hasPrevPage = hasPrevPage
                this.hasNextPage = hasNextPage
                this.totalRegister = totalDocs
                this.count = count
                this.page = page
                this.products = products
                this._cartService.discounts = discounts
            }
        )
    }

    public paginate(action: boolean): void {
        if (action) {
            this.page = this.page + 1
            this.getData(this.page)
        } else {
            if (this.page !== 1) {
                this.page = this.page - 1
                this.getData(this.page)
            }
        }
    }
}
