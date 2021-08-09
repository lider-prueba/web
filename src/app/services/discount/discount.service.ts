import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { environment } from 'src/environments/environment'

@Injectable({
    providedIn: 'root'
})
export class DiscountService {
    constructor(public http: HttpClient) {}

    public getDiscounts(): Observable<Object> {
        let url = `${environment.EndPoint.api}getdiscounts`
        return this.http.get(url).pipe(
            map((resp: any) => {
                const { payload } = resp
                return payload
            })
        )
    }
}
