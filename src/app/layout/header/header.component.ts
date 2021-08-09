import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { CartService } from '../../services/cart/cart.service'
import { PopoverDirective } from 'ngx-smart-popover'
import { Subscription } from 'rxjs'
import { Cart } from '../../interfaces/cart'

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styles: []
})
export class HeaderComponent implements OnInit, OnDestroy {
    @ViewChild('cartPopover', { static: false }) public cartPopover: PopoverDirective
    public $cartProduct: Subscription
    public myCart: Array<Cart> = []

    constructor(public _cartService: CartService) {}

    ngOnInit() {
        // refresh cart
        this.$cartProduct = this._cartService.cartProduct.subscribe((resp: Array<Cart>) => {
            this.myCart = resp
            this.showPopover()
        })
    }

    public showPopover() {
        this.cartPopover.show()
    }

    public hidePopover() {
        this.cartPopover.hide()
    }

    ngOnDestroy() {
        this.$cartProduct.unsubscribe()
    }
}
