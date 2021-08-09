import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment'
import { map } from 'rxjs/operators'

@Injectable({
    providedIn: 'root'
})
export class ProductsService {
    constructor(public http: HttpClient) {}

    public getProducts(page: number): Observable<Object> {
        let url = `${environment.EndPoint.api}getproducts`
        return this.http
            .get(url, {
                params: { page: page.toString() }
            })
            .pipe(
                map((resp: any) => {
                    const { payload } = resp
                    return payload
                })
            )
    }
}
