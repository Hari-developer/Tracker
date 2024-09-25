// password-strength.directive.ts
import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appPasswordStrength]'
})
export class PasswordStrengthDirective implements OnChanges {
  @Input('appPasswordStrength') password: string;

  constructor(private el: ElementRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['password']) {
      this.updateStrength(this.password);
    }
  }

  private updateStrength(password: string): void {
    const strength = this.calculateStrength(password);
    this.el.nativeElement.classList.remove('weak-password', 'medium-password', 'strong-password');
    this.el.nativeElement.classList.add(strength);
  }

  private calculateStrength(password: string): string {
    const hasUpperCase = /[A-Z]+/.test(password);
    const hasLowerCase = /[a-z]+/.test(password);
    const hasNumeric = /[0-9]+/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password);

    let score = 0;
    if (password.length >= 8) score++;
    if (hasUpperCase && hasLowerCase) score++;
    if (hasNumeric) score++;
    if (hasSpecialChar) score++;

    if (score <= 2) return 'weak-password';
    if (score === 3) return 'medium-password';
    return 'strong-password';
  }
}