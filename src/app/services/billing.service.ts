import { Injectable } from '@angular/core';
import { DataSubcription, Subscription_plan } from '../model/subscription_plan.model';

@Injectable({
  providedIn: 'root'
})
export class BillingService {

  private subscriptionPlans!:Array<Subscription_plan>;

  constructor() {
    this.subscriptionPlans = [
      {duration_months:3,price_usd_per_gb:3},
      {duration_months:6,price_usd_per_gb:2.5},
      {duration_months:12,price_usd_per_gb:2},
    ];
   }


   getAllPlans(){
    return this.subscriptionPlans;
   }
}
