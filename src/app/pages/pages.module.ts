//modules
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { BrowserModule } from '@angular/platform-browser'
import { PagesComponent } from './pages.component'
// import { PAGES_ROUTES } from './pages.routes'
import { MainComponent } from './main/main.component'

@NgModule({
    declarations: [PagesComponent, MainComponent],
    exports: [],
    imports: [FormsModule, CommonModule, BrowserModule]
})
export class PagesModule {}
