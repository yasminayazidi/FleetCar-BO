import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListCarsComponent } from './list-cars/list-cars.component';

const routes: Routes = [
  {path:"",component:ListCarsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionCarsRoutingModule { }
