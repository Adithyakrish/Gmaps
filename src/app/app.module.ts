import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapsComponent } from './maps/maps.component';
import {AgmCoreModule} from "@agm/core";
import {AgmDirectionModule} from "agm-direction";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {ToolBarComponent} from "./tool-bar/tool-bar.component";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {BottomNavigationBarComponent} from "./bottom-navigation-bar/bottom-navigation-bar.component";
import {MatButtonToggleModule} from "@angular/material/button-toggle";

@NgModule({
  declarations: [
    AppComponent,
    MapsComponent,
    ToolBarComponent,
    BottomNavigationBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBWNCWizzY1UcYKTG8bzSQxV-gSerIojjg'
    }),
    AgmDirectionModule,
    MatSlideToggleModule,
    FormsModule,
    HttpClientModule,
    AgmDirectionModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
