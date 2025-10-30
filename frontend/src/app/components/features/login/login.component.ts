import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMsg: string = '';

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  login(): void {
    if (this.loginForm.invalid) {
      this.errorMsg = 'Please fill in all fields correctly.';
      return;
    }

    this.userService.loginUser(this.loginForm.value).subscribe({
      next: (res: any) => {
        console.log('✅ Login success:', res);
        // Sauvegarder token et rôle
        localStorage.setItem('token', res.token); // stocke le token
        localStorage.setItem('role', res.user.role); // stocke le rôle
        localStorage.setItem('user', JSON.stringify(res.user)); // ✅ ajout essentiel, stocke le user (objet complet)
        // redirection selon le role
        console.log('🔍 Réponse du backend:', res);
        console.log('🧩 Role reçu:', res.user?.role);
        switch (res.user.role) {
          case 'student':
            this.router.navigate(['/student-dashboard']);
            break;
          case 'teacher':
            this.router.navigate(['/teacher-dashboard']);
            break;
          case 'parent':
            this.router.navigate(['/parent-dashboard']);
            break;
          case 'admin':
            this.router.navigate(['/admin-dashboard']);
            break;
          default:
            this.router.navigate(['/']);
        }
      },
      error: (err: any) => {
        console.error('❌ Login error:', err);
        this.errorMsg = err.error?.message || 'Login failed';
      }
    });
  }
}

