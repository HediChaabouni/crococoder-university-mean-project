import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import { User } from 'src/app/core/models/user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm!: FormGroup;
  errorMsg: string = '';
  emailErrorMsg: string = '';
  telErrorMsg: string = '';
  role!: string; // ⚡ sera déterminé depuis l’URL
  selectedFiles: {
    teacherCV: File | null;
    teacherPhoto: File | null;
    studentPhoto: File | null;
  } = {
      teacherCV: null,
      teacherPhoto: null,
      studentPhoto: null
    };
  selectedFileNames: { [key: string]: string } = {
    teacherCV: '',
    teacherPhoto: '',
    studentPhoto: ''
  };

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    // ✅ Détection du rôle directement depuis l’URL (ex: /signup-student → "student")
    this.role = this.route.snapshot.url[0].path.replace('signup-', '');

    // ✅ Formulaire réactif avec validations
    this.signupForm = this.fb.group(
      {
        firstName: ['', [Validators.required, Validators.minLength(3)]],
        lastName: ['', [Validators.required, Validators.minLength(2)]],
        email: ['', [Validators.required, Validators.email]],
        tel: ['', [Validators.required, Validators.pattern(/^\d{8,}$/)]],
        address: ['', Validators.required],
        password: [
          '',
          [
            Validators.required,
            Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{6,12}$/)
          ]
        ],
        confirmPassword: ['', Validators.required],

        // Champs spécifiques selon le rôle
        teacherSpecialty: [''],
        teacherCV: [''],
        teacherPhoto: [''],
        studentPhoto: [''],
        childTel: [''] // requis uniquement si parent
      },
      { validator: this.confirmPasswordValidator }
    );
  }

  // ✅ Vérification que le password et confirmPassword sont identiques
  confirmPasswordValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  // ✅ Gestion upload des fichiers (CV/Photo teacher/ ou Photo student)
  onFileSelected(event: Event, field: 'teacherCV' | 'teacherPhoto' | 'studentPhoto'): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) {
      this.selectedFiles[field] = null;
      this.selectedFileNames[field] = '';
      return;
    }
    const file = input.files[0];
    this.selectedFiles[field] = file;
    this.selectedFileNames[field] = file.name;

    this.signupForm.patchValue({ [field]: file });
    this.signupForm.get(field)?.updateValueAndValidity();

    console.log(`✅ Fichier sélectionné (${field}):`, file.name);
  }

  // ✅ Méthode signup appelée au submit
  signup(): void {
    if (this.signupForm.invalid) {
      this.errorMsg = 'Please fill the form correctly.';
      return;
    }

    // Création d’un FormData → permet d’envoyer texte + fichiers
    const formData = new FormData();

    // Ajout des champs génériques automatiquement
    Object.keys(this.signupForm.controls).forEach(key => {
      const value = this.signupForm.get(key)?.value;
      if (value && !(value instanceof File)) {
        formData.append(key, value);
      }
    });

    // Ajout du rôle (détecté via l’URL)
    formData.append('role', this.role);

    // Ajout des fichiers (si présents et selon rôle)
    if (this.role === 'teacher') {
      if (this.selectedFiles.teacherCV) formData.append('teacherCV', this.selectedFiles.teacherCV);
      if (this.selectedFiles.teacherPhoto) formData.append('teacherPhoto', this.selectedFiles.teacherPhoto);
    }
    if (this.role === 'student') {
      if (this.selectedFiles.studentPhoto) formData.append('studentPhoto', this.selectedFiles.studentPhoto);
    }

    // Appel au service UserService → envoi au backend
    console.log(this.role);
    console.log('📤 DEBUG FormData envoyé :');
    for (const pair of (formData as any).entries()) {
      console.log('📦', pair[0], pair[1]);
    }
    this.userService.createUser(formData, this.role).subscribe({
      next: (res: User) => {
        console.log('✅ Signup success:', res);
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('❌ Signup error:', err);

        // Gestion des doublons email/tel
        if (err.error?.message?.toLowerCase().includes('email')) {
          this.emailErrorMsg = 'Email already exists, please choose another one.';
        }
        if (err.error?.message?.toLowerCase().includes('tel')) {
          this.telErrorMsg = 'Tel already exists, please choose another one.';
        }

        // Message d’erreur générique
        this.errorMsg = err.error?.message || 'Signup failed';
      }
    });
  }
}


