import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomersService } from '../customers.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-customer',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css'],
})
export class AddCustomerComponent {
  customerForm: FormGroup;

  // Success message property (optional)
  successMessage!: string;

  constructor(
    private fb: FormBuilder,
    private customersService: CustomersService,
    private router: Router
  ) {
    this.customerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      address: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.customerForm.valid) {
      // Handle the form submission logic, such as calling a service
      const newCustomer = this.customerForm.value;
      this.customersService.addCustomer(newCustomer).subscribe(
        () => {
          this.successMessage = "Customer added successfully!";
          // Reset form after submission (optional)
          this.customerForm.reset();
          // Navigate to the "All Customers" view
          this.router.navigate(['/customers']);
        },
        (error) => {
          this.successMessage = "Error adding customer. Please try again.";
        }
  
      );
    } else {
      this.successMessage = "Please fill in all required fields.";
    }
  }

  // Getter methods for form controls
  get name() { return this.customerForm.get('name'); }
  get email() { return this.customerForm.get('email'); }
  get phone() { return this.customerForm.get('phone'); }
  get address() { return this.customerForm.get('address'); }
}
