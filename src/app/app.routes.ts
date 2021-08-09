import { Routes, RouterModule } from '@angular/router'
import { MainComponent } from './pages/main/main.component'
// import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const appRoutes: Routes = [
    { path: 'main', component: MainComponent },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'main'
    }
    // { path: '**', component: PageNotFoundComponent }
]

export const APP_ROUTES = RouterModule.forRoot(appRoutes, { useHash: true })
