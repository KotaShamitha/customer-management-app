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

  trackByCustomerId(index: number, customer: Customer): number {
    return Number(customer.id);
  }
  
  constructor(private service: CustomersService) {}

  ngOnInit(): void {
    this.service.getCustomers().subscribe((data) => {
      this.customers = data;
    });
  }

  getCustomers(): void {
    this.service.getCustomers().subscribe((data) => {
      this.customers = data;
    });
  }
}
