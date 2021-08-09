//modules
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'
import { PopoverModule } from 'ngx-smart-popover'
import { FormsModule } from '@angular/forms'
//components
import { HeaderComponent } from './header/header.component'
import { FooterComponent } from './footer/footer.component'

@NgModule({
    imports: [RouterModule, CommonModule, FormsModule, PopoverModule],
    declarations: [HeaderComponent, FooterComponent],
    exports: [HeaderComponent, FooterComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LayoutModule {}
