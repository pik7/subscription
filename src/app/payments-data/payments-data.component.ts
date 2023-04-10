import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataSubcription, Parameter, Payment, Subscription_plan } from '../model/subscription_plan.model';
import { BillingService } from '../services/billing.service';

@Component({
  selector: 'app-payments-data',
  templateUrl: './payments-data.component.html',
  styleUrls: ['./payments-data.component.css']
})
export class PaymentsDataComponent implements OnInit {

  paymentFormGroup!:FormGroup;
  parameter!:Parameter;
  payment!:Payment;
  data!:DataSubcription;
  plans!:Array<Subscription_plan>;
  constructor(private fb:FormBuilder,private route:ActivatedRoute, private router:Router, private billingService:BillingService) {
    
    this.data = this.router.getCurrentNavigation()?.extras.state as DataSubcription;
  }

  ngOnInit(): void {
    if(this.data.payment.creditCartNumber==0){
      this.paymentFormGroup=this.fb.group({
        creditCartNumber:this.fb.control(null, [Validators.required]),
        creditCartExpDate:this.fb.control(null, [Validators.required]),
        CreditCartSecCode:this.fb.control(null, [Validators.required])
      })
    }else{
      this.paymentFormGroup=this.fb.group({
        creditCartNumber:this.fb.control(this.data.payment.creditCartNumber, [Validators.required]),
        creditCartExpDate:this.fb.control(this.data.payment.creditCartExpDate, [Validators.required]),
        CreditCartSecCode:this.fb.control(this.data.payment.CreditCartSecCode, [Validators.required])
      })
    }

    this.plans = this.billingService.getAllPlans();
  }

  handlenextStep3(){
    this.payment = this.paymentFormGroup?.value;
    this.data.payment = this.payment;

    this.plans.forEach(element => {
      if(this.data.parameter.duration == element.duration_months){
          this.data.pricePerGB = element.price_usd_per_gb;
          this.data.totalPrice = element.price_usd_per_gb*this.data.parameter.amount;
          if(this.data.parameter.upfront == "YES"){
            this.data.totalPrice = this.data.totalPrice - this.data.totalPrice*10/100;
          }
      }
    });
    this.router.navigateByUrl("/confirmation", {state:this.data});


  }

  handlePrevious(){
    this.router.navigateByUrl("/parameters", {state:this.data});
  }
} 
