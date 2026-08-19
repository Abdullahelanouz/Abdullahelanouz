import { Component, inject, OnInit, signal, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { LanguageService } from '../../services/language.service';
import emailjs from '@emailjs/browser';

interface ContactForm {
  name: string;
  email: string;
  message: string;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section id="contact" class="contact-section section" #contactSection>
      <div class="container">
        <div class="section-header" [class.animate]="isVisible()">
          <h2 class="section-title">{{ languageService.translate('contact.title') }}</h2>
          <p class="section-subtitle">
            {{ languageService.translate('contact.subtitle') }}
          </p>
        </div>

        <div class="contact-content" [class.animate]="isVisible()">
          <div class="contact-info">
            <div class="contact-intro">
              <h3 class="intro-title">
                {{ languageService.translate('contact.introTitle') || "Let's work together" }}
              </h3>
              <p class="intro-text">
                {{ languageService.translate('contact.introText') || "I'm always interested in new opportunities and exciting projects. Whether you have a question or just want to say hi, I'll try my best to get back to you!" }}
              </p>
            </div>

            <div class="contact-methods">
              <div class="contact-method">
                <div class="method-icon">
                  <i class="fas fa-envelope"></i>
                </div>
                <div class="method-info">
                  <h4 class="method-title">{{ languageService.translate('contact.email') || 'Email' }}</h4>
                  <a href="mailto:abdullahelanouz@gmail.com" class="method-link">
                    abdullahelanouz&#64;gmail.com
                  </a>
                </div>
              </div>

              <div class="contact-method">
                <div class="method-icon">
                  <i class="fas fa-phone"></i>
                </div>
                <div class="method-info">
                  <h4 class="method-title">{{ languageService.translate('contact.phone') || 'Phone' }}</h4>
                  <a href="tel:+201200240708" class="method-link">
                    +20 120 024 0708
                  </a>
                </div>
              </div>

              <div class="contact-method">
                <div class="method-icon">
                  <i class="fas fa-location-dot"></i>
                </div>
                <div class="method-info">
                  <h4 class="method-title">{{ languageService.translate('contact.location') || 'Location' }}</h4>
                  <span class="method-text">
                    {{ languageService.translate('contact.locationText') || 'Egypt' }}
                  </span>
                </div>
              </div>
            </div>

            <div class="social-links">
              <h4 class="social-title">{{ languageService.translate('contact.followMe') || 'Follow Me' }}</h4>
              <div class="social-icons">
                <a
                  href="https://www.linkedin.com/in/abdullahelanouz/"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="social-link linkedin"
                  aria-label="LinkedIn"
                >
                  <i class="fab fa-linkedin-in"></i>
                </a>

                <a
                  href="https://github.com/Abdullahelanouz"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="social-link github"
                  aria-label="GitHub"
                >
                  <i class="fab fa-github"></i>
                </a>

                <a
                  href="https://www.facebook.com/abdullahelanouz/"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="social-link facebook"
                  aria-label="Facebook"
                >
                  <i class="fab fa-facebook-f"></i>
                </a>

                <a
                  href="https://www.instagram.com/abdullahelanouz/"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="social-link instagram"
                  aria-label="Instagram"
                >
                  <i class="fab fa-instagram"></i>
                </a>
              </div>
            </div>
          </div>

          <div class="contact-form-container">
            <form
              #contactForm="ngForm"
              class="contact-form"
              (ngSubmit)="onSubmit(contactForm)"
              [class.submitting]="isSubmitting()"
            >
              <div class="form-group">
                <label for="name" class="form-label">
                  {{ languageService.translate('contact.name') }}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  class="form-input"
                  [(ngModel)]="formData.name"
                  required
                  #nameInput="ngModel"
                  [placeholder]="languageService.translate('contact.namePlaceholder') || 'Your full name'"
                >
                <div class="form-error" *ngIf="nameInput.invalid && nameInput.touched">
                  {{ languageService.translate('contact.nameRequired') || 'Name is required' }}
                </div>
              </div>

              <div class="form-group">
                <label for="email" class="form-label">
                  {{ languageService.translate('contact.email') }}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  class="form-input"
                  [(ngModel)]="formData.email"
                  required
                  email
                  #emailInput="ngModel"
                  [placeholder]="languageService.translate('contact.emailPlaceholder') || 'your.email@example.com'"
                >
                <div class="form-error" *ngIf="emailInput.invalid && emailInput.touched">
                  <span *ngIf="emailInput.errors?.['required']">
                    {{ languageService.translate('contact.emailRequired') || 'Email is required' }}
                  </span>
                  <span *ngIf="emailInput.errors?.['email']">
                    {{ languageService.translate('contact.emailInvalid') || 'Please enter a valid email' }}
                  </span>
                </div>
              </div>

              <div class="form-group">
                <label for="message" class="form-label">
                  {{ languageService.translate('contact.message') }}
                </label>
                <textarea
                  id="message"
                  name="message"
                  class="form-textarea"
                  rows="6"
                  [(ngModel)]="formData.message"
                  required
                  #messageInput="ngModel"
                  [placeholder]="languageService.translate('contact.messagePlaceholder') || 'Tell me about your project or just say hello...'"
                ></textarea>
                <div class="form-error" *ngIf="messageInput.invalid && messageInput.touched">
                  {{ languageService.translate('contact.messageRequired') || 'Message is required' }}
                </div>
              </div>

              <button
                type="submit"
                class="submit-btn"
                [disabled]="contactForm.invalid || isSubmitting()"
              >
                <span *ngIf="!isSubmitting()" class="btn-content">
                  <i class="fas fa-paper-plane"></i>
                  {{ languageService.translate('contact.send') }}
                </span>
                <span *ngIf="isSubmitting()" class="btn-loading">
                  <i class="fas fa-spinner fa-spin"></i>
                  {{ languageService.translate('contact.sending') || 'Sending...' }}
                </span>
              </button>
            </form>

            <div class="form-success" *ngIf="showSuccess()" [class.show]="showSuccess()">
              <i class="fas fa-check-circle"></i>
              <h4>{{ languageService.translate('contact.successTitle') || 'Message Sent!' }}</h4>
              <p>{{ languageService.translate('contact.successMessage') || 'Thank you for your message. I will get back to you soon!' }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  @ViewChild('contactSection', { static: true }) contactSection!: ElementRef;

  protected readonly languageService = inject(LanguageService);
  protected readonly isVisible = signal(false);
  protected readonly isSubmitting = signal(false);
  protected readonly showSuccess = signal(false);
  private observer!: IntersectionObserver;

  protected formData: ContactForm = {
    name: '',
    email: '',
    message: ''
  };

  ngOnInit() {
    this.setupIntersectionObserver();
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  private setupIntersectionObserver() {
    if (typeof window !== 'undefined') {
      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              this.isVisible.set(true);
            }
          });
        },
        { threshold: 0.3 }
      );

      this.observer.observe(this.contactSection.nativeElement);
    }
  }

  protected onSubmit(form: NgForm) {
    if (form.valid && !this.isSubmitting()) {
      this.isSubmitting.set(true);

      // إعداد بيانات EmailJS للتواصل
      const templateParams = {
        to_email: 'abdullahelanouz@gmail.com',
        from_name: this.formData.name,
        from_email: this.formData.email,
        message: this.formData.message,
        subject: 'رسالة جديدة من موقعك الشخصي',
        reply_to: this.formData.email,
        user_name: this.formData.name
      };

      // إرسال الإيميل عبر EmailJS
      emailjs.send(
        'service_64tyidh', // Service ID
        'template_cs178tv', // Template ID (نفس template الاشتراك أو template منفصل للتواصل)
        templateParams,
        'hwTB3eTwxj8KI6CU3' // Public Key
      )
      .then((response) => {
        console.log('Contact email sent successfully!', response.status, response.text);
        this.isSubmitting.set(false);
        this.showSuccess.set(true);

        // Reset form
        this.formData = { name: '', email: '', message: '' };
        form.resetForm();

        // Hide success message after 5 seconds
        setTimeout(() => {
          this.showSuccess.set(false);
        }, 5000);
      })
      .catch((error) => {
        console.error('Failed to send contact email:', error);
        this.isSubmitting.set(false);
        alert('حدث خطأ في إرسال الرسالة. يرجى المحاولة مرة أخرى أو التواصل عبر واتساب.');
      });
    }
  }
}
