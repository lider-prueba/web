import { Injectable } from '@angular/core'
import { ToastrService } from 'ngx-toastr'

@Injectable({
    providedIn: 'root'
})
export class UtilsService {
    constructor(private toastrService: ToastrService) {}

    public parserResponse(message: string, type: string, titile: string) {
        if (type === 'error') {
            this.toastrService.error(message, titile, {
                timeOut: 3000,
                closeButton: true,
                progressBar: true,
                positionClass: 'toast-bottom-left'
            })
            return false
        }
        if (type === 'success') {
            this.toastrService.success(message, titile, {
                timeOut: 3000,
                closeButton: true,
                progressBar: true,
                positionClass: 'toast-bottom-left'
            })
            return true
        }
    }
}
