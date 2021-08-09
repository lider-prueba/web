import { EventEmitter, Injectable } from '@angular/core'
import { Cart } from '../../interfaces/cart'
import { ProductElement } from '../../interfaces/product'
import { Discount } from '../../interfaces/discount'

@Injectable({
    providedIn: 'root'
})
export class CartService {
    public cartProduct: EventEmitter<any> = new EventEmitter<any>()
    public cart: Array<Cart> = []
    public discounts: Array<Discount> = []
    public count: number = 0
    public total: number = 0
    public msgDiscount: string = ''
    public msgBiggerDiscount: string = ''
    public discount: number = 0

    constructor() {}

    /**
     * add product for the 1st time to evaluate if the button change, calculate total and calculate discounts
     * @param product Cart
     */
    public addFirstProduct(product: Cart): void {
        product.onCart = true
        product.quantity = 1
        if (!this.cart.includes(product)) this.cart.push(product)
        this.cartProduct.emit(this.cart)
        product.totalPrice = this.countProducts(product)
        this.caculateTotal()
        this.manageDiscount(product)
    }

    /**
     * Add or quit product from cart, calculate total and calculate discounts
     * @param product Cart
     * @param action add or quit product
     */
    public managamentCart(product: Cart, action: boolean): void {
        let productToManipulate: Cart = this.cart.find((prod: Cart) => prod._id === product._id)
        if (action) {
            productToManipulate.quantity++
        } else {
            if (productToManipulate.quantity >= 1 && productToManipulate.quantity--) {
                if (productToManipulate.quantity >= 1) {
                    productToManipulate.onCart = true
                } else {
                    this.cart = this.cart.filter((prod: ProductElement) => prod._id !== product._id)
                    productToManipulate.onCart = false
                }
            }
        }
        this.cartProduct.emit(this.cart)
        productToManipulate.totalPrice = this.countProducts(product)
        this.caculateTotal()
        this.manageDiscount(product)
    }

    /**
     * deduce discounts
     * @param product Cart
     */
    public manageDiscount(product: Cart) {
        // show missing threshold to apply discount by brand
        const { threshold, discount, brand } = this.discounts.find((discount: Discount) => discount.brand === product.brand)
        const totalByBrand = this.cart.filter((prod: Cart) => prod.brand === product.brand).reduce((total, item) => total + item.totalPrice, 0)
        const total = threshold - totalByBrand

        // get discounts from the products in the cart
        let discountsCart = []

        this.discounts.forEach((discount: Discount) => {
            this.cart.forEach((prod: ProductElement) => {
                if (discount.brand === prod.brand && !discountsCart.includes(discount)) discountsCart.push(discount)
            })
        })
        // if total is above of threshold and discount is begger then 0, then, show message to reach threshold, case, reset variables
        if (totalByBrand < threshold && discount > 0) {
            this.msgBiggerDiscount = ''
            this.discount = 0
            this.msgDiscount = `Agrega ${total} más en productos ${brand} y aprovecha un descuento total de ${discount} en tu compra!`
            // deduce bigger discount and show it in the screen when the cart length if bigger then 1
            if (this.cart.length < 1) {
                const [biggerDiscount] = discountsCart.sort((a, b) => (a.discount > b.discount ? 1 : b.discount > a.discount ? -1 : 0)).reverse()
                this.msgBiggerDiscount = biggerDiscount && `Aprovecha un mayor descuento con la marca: ${biggerDiscount.brand}`
            }
        } else {
            // only if discount is above 0
            if (discount > 0) {
                // apply discount
                let biggerDiscount: Discount = discountsCart.find((dis: Discount) => dis.discount > discount)
                let totalProd: number = this.cart
                    .filter((prod: ProductElement) => prod.brand === brand)
                    .reduce((total, item) => total + item.price, 0)
                this.discount = discount
                this.msgDiscount = ''
                this.msgBiggerDiscount = `Se aplicó un descuento de ${discount} por haber comprado ${totalProd} de productos ${brand}`

                // deduce bigger "posible" discount
                if (biggerDiscount && biggerDiscount.discount < 0) {
                    let totalBigBrand = this.cart
                        .filter((prod: ProductElement) => prod.brand === biggerDiscount.brand)
                        .reduce((total, item) => total + item.price, 0)
                    this.msgDiscount = `Agrega ${biggerDiscount.threshold - totalBigBrand} más en productos ${
                        biggerDiscount.brand
                    } y aprovecha un descuento total de ${biggerDiscount.discount} en tu compra!`
                }
            }
        }
    }

    /**
     * cpunt product to show in header
     * @param product
     * @returns product's count
     */
    private countProducts(product: Cart) {
        this.count = this.cart.reduce((total, item) => total + item.quantity, 0)
        let groupedProduct = this.cart
            .filter((prod: ProductElement) => prod._id === product._id)
            .reduce((total, item) => total + item.quantity * item.price, 0)
        return groupedProduct
    }

    private caculateTotal() {
        this.total = this.cart.reduce((total, item) => total + item.totalPrice, 0)
    }
}
