import { Component } from '@angular/core'
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogModule],
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomerComponent {
  customers = [
    { id: 1, name: 'John Doe', email: 'johndoe@email.com' },
    { id: 2, name: 'Kota Shamitha', email: 'shami123@gmail.com' }
  ];

  constructor(private dialog: MatDialog) {}

  deleteCustomer(customer: any, event: Event): void {
    event.stopPropagation(); 

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: { message: `Are you sure you want to delete ${customer.name}?` }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.customers = this.customers.filter((c) => c.id !== customer.id);
      }
    });
  }
  editCustomer(customer: any, event: Event): void {
    event.stopPropagation();
    alert(`Edit functionality for ${customer.name} (not implemented yet).`);
  }

  trackByCustomerId(index: number, customer: any): number {
    return customer.id;
  }
}
