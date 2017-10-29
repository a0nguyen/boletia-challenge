import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule, MatMenuModule, MatToolbarModule, MatIconModule, MatCardModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import 'hammerjs';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { EventsPageComponent } from './components/events-page/events-page.component';
import { BookPageComponent } from './components/book-page/book-page.component';
import { ReceiptPageComponent } from './components/receipt-page/receipt-page.component';

export const firebaseConfig = {
  apiKey: "AIzaSyCxQnD5Zsoei1TR_R1JRX0y--NcCloCRLk",
  authDomain: "boletia-challenge.firebaseapp.com",
  databaseURL: "https://boletia-challenge.firebaseio.com",
  projectId: "boletia-challenge",
  storageBucket: "boletia-challenge.appspot.com",
  messagingSenderId: "877068125402"
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomepageComponent,
    EventsPageComponent,
    BookPageComponent,
    ReceiptPageComponent
  ],
  imports: [
    AngularFireModule.initializeApp(firebaseConfig), AngularFireDatabaseModule, FormsModule, AppRoutingModule, BrowserModule, BrowserAnimationsModule, MatButtonModule, MatCheckboxModule, MatMenuModule, MatToolbarModule, MatIconModule, MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
