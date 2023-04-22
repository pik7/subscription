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


   calculate( data:DataSubcription):DataSubcription{
    let plans =  this.getAllPlans();
    plans.forEach(element => {
      if(data.parameter.duration == element.duration_months){
          data.pricePerGB = element.price_usd_per_gb;
          data.totalPrice = element.price_usd_per_gb*data.parameter.amount;
          if(data.parameter.upfront == "YES"){
            data.totalPrice = data.totalPrice - data.totalPrice*10/100;
          }
      }
    });

    return data;
   }

   initData(){
    return {
      parameter:{
        duration:12,
        amount:5,
        upfront:"NO",
      },
      payment:{
        creditCartNumber:0,
        creditCartExpDate:new Date(),
        CreditCartSecCode:0,
      },
      email:"",
      pricePerGB:0,
      totalPrice:0,
      
    }
  }
}
