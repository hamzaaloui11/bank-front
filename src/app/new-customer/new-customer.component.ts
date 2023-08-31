import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CustomerServiceService} from "../services/customer-service.service";
import {Router} from "@angular/router";
import {Customer} from "../model/customer.module";

@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrls: ['./new-customer.component.css']
})
export class NewCustomerComponent implements OnInit{
  newCustomerFormGroup! : FormGroup;
  constructor(private fb:FormBuilder,private newService:CustomerServiceService,private router:Router) {
  }

  ngOnInit(): void {
    this.newCustomerFormGroup=this.fb.group({
      name : this.fb.control(null,[Validators.required,Validators.minLength(4)]),
      email: this.fb.control(null,[Validators.required,Validators.email])
    });
  }

  handleAddCustomer() {
    let customer:Customer=this.newCustomerFormGroup.value;
    this.newService.addCostumers(customer).subscribe({
      next : data=>{
        alert("Customer has been saved successfully !");
        //this.newCustomerFormGroup.reset();
        this.router.navigateByUrl("/customers");

      },
      error:err =>{
        console.log(err);
      }
    });
  }
}
