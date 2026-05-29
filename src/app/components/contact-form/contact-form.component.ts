import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PortfolioService } from '../../services/portfolio.service';
import { ContactRequest } from '../../models/contact.model';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {
  contactForm!: FormGroup;
  submitted = false;
  loading = false;
  successMessage = '';
  errorMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private portfolioService: PortfolioService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.contactForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required, Validators.minLength(3)]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  get f() {
    return this.contactForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.contactForm.invalid) {
      return;
    }

    this.loading = true;
    this.successMessage = '';
    this.errorMessage = '';

    const request: ContactRequest = this.contactForm.value;

    this.portfolioService.sendContactMessage(request).subscribe({
      next: (response) => {
        this.loading = false;
        this.successMessage = response.message;
        this.contactForm.reset();
        this.submitted = false;

        // Clear success message after 5 seconds
        setTimeout(() => {
          this.successMessage = '';
        }, 5000);
      },
      error: (error) => {
        this.loading = false;
        this.errorMessage = error.error?.message || 'Failed to send message. Please try again.';

        // Clear error message after 5 seconds
        setTimeout(() => {
          this.errorMessage = '';
        }, 5000);
      }
    });
  }
}
