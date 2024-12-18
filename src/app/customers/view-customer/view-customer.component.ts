import { Component, OnInit } from '@angular/core';
import { CustomersService, Customer } from '../customers.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-customer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-customer.component.html',
  styleUrls: ['./view-customer.component.css'],
})
export class ViewCustomerComponent implements OnInit {
  customerDetails!: Customer;

  constructor(private service: CustomersService) {}

  ngOnInit(): void {
    this.service.getCustomers().subscribe((customers: Customer[]) => {
      this.customerDetails = customers[0]; // Example: Show the first customer's details
    });
  }
}
