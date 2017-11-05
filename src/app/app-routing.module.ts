import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { EventsPageComponent } from './components/events-page/events-page.component';
import { BookPageComponent } from './components/book-page/book-page.component';
import { Router, ActivatedRoute, Params } from '@angular/router'
import { ReceiptPageComponent } from './components/receipt-page/receipt-page.component';
import { ComissionsPageComponent } from './components/comissions-page/comissions-page.component';

const appRoutes: Routes = [
    { path: '', component: HomepageComponent },
    { path: 'events', component: EventsPageComponent },
    { path: 'events/:id/book', component: BookPageComponent },
    { path: 'events/:id/comissions', component: ComissionsPageComponent },    
    { path: 'receipt/:id', component: ReceiptPageComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }