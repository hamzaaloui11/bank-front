import {Component, OnInit} from '@angular/core';
import {catchError, Observable, throwError} from "rxjs";
import {Customer} from "../model/customer.module";
import {CustomerServiceService} from "../services/customer-service.service";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit{
  customers !: Observable<Array<Customer>>;
  errorMesaage! : string;
  searchFormGroup: FormGroup |undefined;
  constructor(private customerService:CustomerServiceService,private fb :FormBuilder) {
  }
  ngOnInit(): void {
    this.searchFormGroup=this.fb.group({
      keyword :this.fb.control("")
    });
    this.handleSearchCustomers();
  }

  handleSearchCustomers() {
    let kw=this.searchFormGroup?.value.keyword;
    this.customers=this.customerService.searchCostumers(kw).pipe(
      catchError(err=>{
        this.errorMesaage=err.message;
        return throwError(err);
      })
    );
  }

}
