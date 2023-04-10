import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { ParametersComponent } from './parameters/parameters.component';
import { PaymentsDataComponent } from './payments-data/payments-data.component';

const routes: Routes = [
  {path : "parameters", component : ParametersComponent},
  {path : "payments" , component : PaymentsDataComponent},
  {path : "confirmation" , component : ConfirmationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
