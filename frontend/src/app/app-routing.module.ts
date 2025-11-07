import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/features/home/home.component';
import { AboutComponent } from './components/features/about/about.component';
import { CoursesComponent } from './components/features/courses/courses.component';
import { BlogComponent } from './components/features/blog/blog.component';
import { ContactComponent } from './components/features/contact/contact.component';
import { TestimonialsComponent } from './components/features/testimonials/testimonials.component';
import { UsersComponent } from './components/features/users/users.component';
import { ClassesComponent } from './components/features/classes/classes.component';
import { EvalsComponent } from './components/features/evals/evals.component';
import { SignupComponent } from './components/features/signup/signup.component';
import { LoginComponent } from './components/features/login/login.component';
import { StudentCoursesComponent } from './components/features/student-courses/student-courses.component';
import { StudentClassComponent } from './components/features/student-class/student-class.component';
import { StudentEvalsComponent } from './components/features/student-evals/student-evals.component';
import { AdminAssignComponent } from './components/features/admin-assign/admin-assign.component';
import { AdminCrudComponent } from './components/features/admin-crud/admin-crud.component';
import { TeacherCoursesComponent } from './components/features/teacher-courses/teacher-courses.component';
import { TeacherEvalsComponent } from './components/features/teacher-evals/teacher-evals.component';
import { CourseFormComponent } from './components/features/course-form/course-form.component';
import { EvalFormComponent } from './components/features/eval-form/eval-form.component';
import { ProfileComponent } from './components/features/profile/profile.component';
import { ParentEvalsComponent } from './components/features/parent-evals/parent-evals.component';
import { TeachersComponent } from './components/features/teachers/teachers.component';
import { AdminDashboardComponent } from './components/features/admin-dashboard/admin-dashboard.component';
import { TeacherDashboardComponent } from './components/features/teacher-dashboard/teacher-dashboard.component';
import { ParentDashboardComponent } from './components/features/parent-dashboard/parent-dashboard.component';
import { StudentDashboardComponent } from './components/features/student-dashboard/student-dashboard.component';
import { ParentSearchComponent } from './components/features/parent-search/parent-search.component';
import { ParentChildrenComponent } from './components/features/parent-children/parent-children.component';
import { TeacherClassesComponent } from './components/features/teacher-classes/teacher-classes.component';
import { TeacherStudentsComponent } from './components/features/teacher-students/teacher-students.component';
import { TeacherCoursesListComponent } from './components/features/teacher-courses-list/teacher-courses-list.component';
import { TeacherEvalsListComponent } from './components/features/teacher-evals-list/teacher-evals-list.component';
import { StudentTeachersComponent } from './components/features/student-teachers/student-teachers.component';

const routes: Routes = [
  // Pages publiques
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'testimonials', component: TestimonialsComponent },

  // Authentification & Inscription routes
  { path: 'signup-student', component: SignupComponent, data: { role: 'student' } }, // data formulaire signup pr student
  { path: 'signup-teacher', component: SignupComponent, data: { role: 'teacher' } }, // data formulaire signup pr teacher
  { path: 'signup-parent', component: SignupComponent, data: { role: 'parent' } }, // data formulaire signup pr parent
  { path: 'signup-admin', component: SignupComponent, data: { role: 'admin' } }, // data formulaire signup pr admin
  { path: 'login', component: LoginComponent }, // page de login
  { path: 'users', component: UsersComponent }, // liste des users (admin) ??

  // Student, paths spécifiques
  { path: 'student-courses', component: StudentCoursesComponent }, // liste des cours pr student
  { path: 'student-class', component: StudentClassComponent }, // la classe pr student
  { path: 'student-evals', component: StudentEvalsComponent }, // liste des evals pr student

  // Parent paths spécifiques
  { path: 'parent-evals', component: ParentEvalsComponent }, // liste des evals pr parent pour child
  { path: 'parent-children', component: ParentChildrenComponent }, // liste des enfants pr parent

  // Teachers, paths spécifiques
  { path: 'teachers', component: TeachersComponent }, // Liste de ts les cours, public et dashboards
  { path: 'teacher-courses', component: TeacherCoursesComponent }, // liste des cours du prof connecté
  { path: 'teacher-evals', component: TeacherEvalsComponent }, // liste des evals du prof connecté
  { path: 'teacher-classes', component: TeacherClassesComponent }, // liste des classes du prof connecté 
  { path: 'teacher-students', component: TeacherStudentsComponent }, // liste des students du prof connecté 

  // Courses, paths spécifiques
  { path: 'courses', component: CoursesComponent }, // enduser view
  { path: 'courses/new', component: CourseFormComponent }, // création d'un cours par le teacher
  { path: 'courses/edit/:id', component: CourseFormComponent }, // édition d'un cours par le teacher

  // Evals, paths spécifiques
  { path: 'evals', component: EvalsComponent }, // enduser view
  { path: 'evals/new', component: EvalFormComponent }, // création d'une eval par le teacher
  { path: 'evals/edit/:id', component: EvalFormComponent }, // édition d'une eval par le teacher

  // Classes, paths spécifiques
  { path: 'classes', component: ClassesComponent }, // Enduser view + Liste pr dashboards (affichage simple)

  // Dashboards & nested routes for student/teacher/parent
  {
    path: 'admin-dashboard',
    component: AdminDashboardComponent,
    // canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'crud', pathMatch: 'full' },
      { path: 'crud', component: AdminCrudComponent },
      { path: 'assign', component: AdminAssignComponent },
      { path: 'profile', component: ProfileComponent }
    ]
  },
  {
    path: 'teacher-dashboard',
    component: TeacherDashboardComponent,
    // canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'classes', pathMatch: 'full' },
      { path: 'add-courses', component: TeacherCoursesComponent },
      { path: 'courses-list', component: TeacherCoursesListComponent },  // ✅
      { path: 'add-evals', component: TeacherEvalsComponent },
      { path: 'evals-list', component: TeacherEvalsListComponent },      // ✅
      { path: 'classes', component: TeacherClassesComponent },
      { path: 'students', component: TeacherStudentsComponent },
      { path: 'profile', component: ProfileComponent }
    ]
  },
  {
    path: 'parent-dashboard',
    component: ParentDashboardComponent,
    // canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'children', pathMatch: 'full' },
      { path: 'parent-children', component: ParentChildrenComponent },
      { path: 'parent-evals', component: ParentEvalsComponent },
      { path: 'parent-search', component: ParentSearchComponent },
      { path: 'profile', component: ProfileComponent }
    ]
  },
  {
    path: 'student-dashboard',
    component: StudentDashboardComponent,
    // canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'student-courses', pathMatch: 'full' },
      { path: 'student-courses', component: StudentCoursesComponent },
      { path: 'student-teachers', component: StudentTeachersComponent },
      { path: 'student-class', component: StudentClassComponent },
      { path: 'student-evals', component: StudentEvalsComponent },
      { path: 'profile', component: ProfileComponent }
    ]
  },

  // ✅ Fallback si route inconnue
  { path: '**', redirectTo: '' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
