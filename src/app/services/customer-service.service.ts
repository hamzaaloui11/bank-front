import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Customer} from "../model/customer.module";

@Injectable({
  providedIn: 'root'
})
export class CustomerServiceService {

  constructor(private http:HttpClient) { }

  public getCustomer():Observable<Array<Customer>>{
    return this.http.get<Array<Customer>>("http://localhost:8084/customers");
  }
  public searchCostumers(keyword : String):Observable<Array<Customer>>{
    return this.http.get<Array<Customer>>("http://localhost:8084/customers/search?keyword="+keyword)
  }
}
