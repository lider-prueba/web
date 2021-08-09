// modules
import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { PagesModule } from './pages/pages.module'
import { AppRoutingModule } from './app-routing.module'
import { APP_ROUTES } from './app.routes'
import { LayoutModule } from './layout/layout.module'
import { HttpClientModule } from '@angular/common/http'
import { ToastrModule } from 'ngx-toastr'
// components
import { AppComponent } from './app.component'

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, AppRoutingModule, PagesModule, APP_ROUTES, LayoutModule, HttpClientModule, ToastrModule.forRoot()],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
