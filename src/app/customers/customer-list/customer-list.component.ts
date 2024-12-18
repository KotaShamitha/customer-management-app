import { Component, OnInit } from '@angular/core';
import { CustomersService, Customer } from '../customers.service'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css'],
})
export class CustomerListComponent implements OnInit {
  customers: Customer[] = [];
  selectedCustomer: Customer | null = null; 

  constructor(private service: CustomersService) {}

  ngOnInit(): void {
    this.getCustomers();
  }

  
  getCustomers(): void {
    this.service.getCustomers().subscribe((data) => {
      this.customers = data;
    });
  }

  selectCustomer(customer: Customer): void {
    if (this.selectedCustomer === customer) {
      this.selectedCustomer = null; 
    } else {
      this.selectedCustomer = customer;
    }
  }

  
  trackByCustomerId(index: number, customer: Customer): number {
    return Number(customer.id);
  }
}
