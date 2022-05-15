import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { Componente01Component } from './componente01/componente01.component';
import { Componente02Component } from './componente02/componente02.component';
import { CabecalhoComponent } from './cabecalho/cabecalho.component';
import { RodapeComponent } from './rodape/rodape.component';
import { AppRoutingModule } from './app-routing.module';
import { Componente03Component } from './componente03/componente03.component';
import { Componente04Component } from './componente04/componente04.component';
import { Componente05Component } from './componente05/componente05.component';
import { Componente06Component } from './componente06/componente06.component';

@NgModule({
  declarations: [
    AppComponent,
    Componente01Component,
    Componente02Component,
    CabecalhoComponent,
    RodapeComponent,
    Componente03Component,
    Componente04Component,
    Componente05Component,
    Componente06Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
