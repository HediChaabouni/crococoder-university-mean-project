import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/core/services/user.service';
import { Router } from '@angular/router';
import { User } from 'src/app/core/models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profileForm!: FormGroup;
  user!: User; // user connecté (à récupérer via backend plus tard)
  selectedFile: File | null = null;

  // messages d’erreurs
  errorMsg: string = '';
  emailErrorMsg: string = '';
  telErrorMsg: string = '';

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // ⚡ Simuler l’utilisateur connecté → tu remplaceras ça par un appel backend
    this.user = JSON.parse(localStorage.getItem('user') || '{}');

    this.profileForm = this.fb.group({
      firstName: [this.user.firstName, [Validators.required]],
      lastName: [this.user.lastName, [Validators.required]],
      email: [this.user.email, [Validators.required, Validators.email]],
      tel: [this.user.tel, [Validators.required, Validators.pattern(/^\d{8,}$/)]],
      address: [this.user.address, Validators.required],
      password: [''],

      // spécifiques teacher
      teacherSpecialty: [this.user.teacherSpecialty || ''],
      teacherCV: [''],

      // spécifiques student
      studentPhoto: [''],

      // spécifiques parent
      childTel: [{ value: this.user.childTel, disabled: true }] 
    });
  }

  onFileSelected(event: Event, field: 'teacherCV' | 'studentPhoto'): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.selectedFile = file;
      this.profileForm.patchValue({ [field]: file });
    }
  }

  updateProfile(): void {
  if (this.profileForm.invalid) {
    this.errorMsg = 'Please fill the form correctly.';
    return;
  }

  const formData = new FormData();

  // Champs communs
  formData.append('firstName', this.profileForm.value.firstName);
  formData.append('lastName', this.profileForm.value.lastName);
  formData.append('email', this.profileForm.value.email);
  formData.append('tel', this.profileForm.value.tel);
  formData.append('address', this.profileForm.value.address);

  if (this.profileForm.value.password) {
    formData.append('password', this.profileForm.value.password);
  }

  // Champs spécifiques Teacher
  if (this.user.role === 'teacher') {
    if (this.profileForm.value.teacherSpecialty) {
      formData.append('teacherSpecialty', this.profileForm.value.teacherSpecialty);
    }
    if (this.profileForm.value.teacherCV) {
      formData.append('teacherCV', this.profileForm.value.teacherCV);
    }
  }

  // Champs spécifiques Student
  if (this.user.role === 'student') {
    if (this.profileForm.value.studentPhoto) {
      formData.append('studentPhoto', this.profileForm.value.studentPhoto);
    }
  }

  // Champs spécifiques Parent → ⚠️ read-only (pas modifiable)
  // donc rien à envoyer
  
  // updateProfile(): void {
  //   if (this.profileForm.invalid) {
  //     this.errorMsg = 'Please fill the form correctly.';
  //     return;
  //   }

  //   const formData = new FormData();
  //   Object.keys(this.profileForm.controls).forEach(key => {
  //     const controlValue = this.profileForm.get(key)?.value;
  //     if (controlValue) {
  //       formData.append(key, controlValue);
  //     }
  //   });

  //   // fichiers upload
  //   if (this.user.role === 'teacher' && this.profileForm.value.teacherCV) {
  //     formData.append('teacherCV', this.profileForm.value.teacherCV);
  //   }
  //   if (this.user.role === 'student' && this.profileForm.value.studentPhoto) {
  //     formData.append('studentPhoto', this.profileForm.value.studentPhoto);
  //   }

    // appel du service 
    this.userService.updateUser(this.user._id!, formData).subscribe({
      next: (res: User) => {
        console.log('✅ Profile updated:', res);
        localStorage.setItem('user', JSON.stringify(res));
        this.router.navigate([`/${this.user.role}-dashboard`]);
      },
      error: (err) => {
        console.error('❌ Update error:', err);

        if (err.error?.message?.toLowerCase().includes('email')) {
          this.emailErrorMsg = 'Email already exists';
        }
        if (err.error?.message?.toLowerCase().includes('tel')) {
          this.telErrorMsg = 'Tel already exists';
        }

        this.errorMsg = err.error?.message || 'Update failed';
      }
    });
  }
}

