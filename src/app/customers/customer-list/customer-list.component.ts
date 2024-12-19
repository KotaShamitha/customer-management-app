import { Component, OnInit } from '@angular/core';
import { CustomersService, Customer } from '../customers.service'; 
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';


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

  constructor(private dialog: MatDialog, private customerService: CustomersService) {}

  ngOnInit(): void {
    this.getCustomers();
  }

  
  getCustomers(): void {
    this.customerService.getCustomers().subscribe((data) => {
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

  editCustomer(customer: any, event: Event): void {
    event.stopPropagation(); 
    console.log('Edit customer:', customer);
    
  }
  
  onDelete(customerId: string): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        message: 'Are you sure you want to delete this customer?'
      },
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.customerService.deleteCustomer(customerId).subscribe(() => {
          this.getCustomers(); 
        });
      }
    });
  }
  
  trackByCustomerId(index: number, customer: Customer): number {
    return Number(customer.id);
  }
}
