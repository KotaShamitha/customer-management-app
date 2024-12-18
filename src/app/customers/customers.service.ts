import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
}

@Injectable({
  providedIn: 'root',
})
export class CustomersService {
  private customersSubject: BehaviorSubject<Customer[]> = new BehaviorSubject<Customer[]>([
    {
      id: '1',
      name: 'John Doe',
      email: 'johndoe@email.com',
      phone: '1234567890',
      address: '123 Main St, City, State 12345',
    },
  ]);


  getCustomers(): Observable<Customer[]> {
    return this.customersSubject.asObservable();
  }


  addCustomer(customer: Omit<Customer, 'id'>): Observable<Customer[]> {
    const id = (this.customersSubject.value.length + 1).toString();
    const newCustomer = { id, ...customer };
    const updatedCustomers = [...this.customersSubject.value, newCustomer];
    this.customersSubject.next(updatedCustomers);
    return this.getCustomers(); 
  }

  deleteCustomer(id: string): Observable<Customer[]> {
    const updatedCustomers = this.customersSubject.value.filter(
      (customer) => customer.id !== id
    );
    this.customersSubject.next(updatedCustomers); 
    return this.getCustomers(); 
  }
}
