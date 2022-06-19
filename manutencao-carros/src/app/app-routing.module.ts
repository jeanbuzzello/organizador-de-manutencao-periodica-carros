import { FormularioComponent } from './formulario/formulario.component';
import { ListagemComponent } from './listagem/listagem.component';
import { Componente03Component } from './componente03/componente03.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { Componente04Component } from './componente04/componente04.component';
import { Componente06Component } from './componente06/componente06.component';


const routes:Routes = [

  {path : '', component : ListagemComponent},
  {path : 'formulario-manutencao', component : FormularioComponent},
  {path : 'component6/:id', component: Componente06Component},
  {path : 'formulario-manutencao/:id', component: FormularioComponent}

];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports : [RouterModule]
})
export class AppRoutingModule { }
