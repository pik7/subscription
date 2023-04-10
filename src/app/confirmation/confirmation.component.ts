import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataSubcription, Parameter } from '../model/subscription_plan.model';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {
  data!:DataSubcription;
  confirmFormGroup!:FormGroup;
  constructor(private fb:FormBuilder,private route:ActivatedRoute, private router:Router) {
    this.data = this.router.getCurrentNavigation()?.extras.state as DataSubcription;
  }

  ngOnInit(): void {
    this.confirmFormGroup=this.fb.group({
      email:this.fb.control(null, [Validators.required, Validators.email]),
      agreement:this.fb.control(false, Validators.requiredTrue),
    })
  }

  handleConfirmation(){

  }

  handlePrevious(){
    this.router.navigateByUrl("/payments", {state:this.data});
  }
}
