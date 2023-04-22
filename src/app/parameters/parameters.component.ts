import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
//import { isEmpty } from 'rxjs';
import { DataSubcription, Parameter, Subscription_plan } from '../model/subscription_plan.model';
import { BillingService } from '../services/billing.service';

@Component({
  selector: 'app-parameters',
  templateUrl: './parameters.component.html',
  styleUrls: ['./parameters.component.css']
})
export class ParametersComponent implements OnInit {

  parametersFormGroup!:FormGroup;
  parameter!:Parameter;
  data!:DataSubcription;
  plans!:Array<Subscription_plan>;

  constructor(private fb:FormBuilder,private route:ActivatedRoute, private router:Router, private billingService:BillingService) {
    this.data = this.router.getCurrentNavigation()?.extras.state as DataSubcription;
    if(!this.data){
      this.data = this.initData();
    }
  }

  ngOnInit(): void {    
      this.parametersFormGroup=this.fb.group({
        duration:this.fb.control(this.data.parameter.duration, [Validators.required]),
        amount:this.fb.control(this.data.parameter.amount, [Validators.required]),
        upfront:this.fb.control(this.data.parameter.upfront)
      })
      
      this.plans = this.billingService.getAllPlans();
      
    
  }

  handlenextStep2(){
    this.data.parameter = this.parametersFormGroup?.value;
    this.data = this.billingService.calculate(this.data);
    this.router.navigateByUrl("/payments", {state:this.data});
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
