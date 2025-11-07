import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { HeroBannerComponent } from './components/shared/hero-banner/hero-banner.component';
import { FunFactsComponent } from './components/shared/fun-facts/fun-facts.component';
import { HomeComponent } from './components/features/home/home.component';
import { AboutComponent } from './components/features/about/about.component';
import { CoursesComponent } from './components/features/courses/courses.component';
import { BlogComponent } from './components/features/blog/blog.component';
import { ContactComponent } from './components/features/contact/contact.component';
import { TestimonialsComponent } from './components/features/testimonials/testimonials.component';
import { HttpClientModule } from '@angular/common/http';
import { UsersComponent } from './components/features/users/users.component';
import { EvalsComponent } from './components/features/evals/evals.component';
import { ClassesComponent } from './components/features/classes/classes.component';
import { SignupComponent } from './components/features/signup/signup.component';
import { LoginComponent } from './components/features/login/login.component';
import { TeacherCoursesComponent } from './components/features/teacher-courses/teacher-courses.component';
import { CourseFormComponent } from './components/features/course-form/course-form.component';
import { CourseListComponent } from './components/features/course-list/course-list.component';
import { CourseItemComponent } from './components/features/course-item/course-item.component';
import { TeacherEvalsComponent } from './components/features/teacher-evals/teacher-evals.component';
import { EvalFormComponent } from './components/features/eval-form/eval-form.component';
import { EvalListComponent } from './components/features/eval-list/eval-list.component';
import { EvalItemComponent } from './components/features/eval-item/eval-item.component';
import { ProfileComponent } from './components/features/profile/profile.component';
import { StudentCoursesComponent } from './components/features/student-courses/student-courses.component';
import { StudentClassComponent } from './components/features/student-class/student-class.component';
import { StudentEvalsComponent } from './components/features/student-evals/student-evals.component';
import { ParentEvalsComponent } from './components/features/parent-evals/parent-evals.component';
import { ParentSearchComponent } from './components/features/parent-search/parent-search.component';
import { AdminAssignComponent } from './components/features/admin-assign/admin-assign.component';
import { AdminCrudComponent } from './components/features/admin-crud/admin-crud.component';
import { TeachersComponent } from './components/features/teachers/teachers.component';
import { StudentDashboardComponent } from './components/features/student-dashboard/student-dashboard.component';
import { AdminDashboardComponent } from './components/features/admin-dashboard/admin-dashboard.component';
import { ParentDashboardComponent } from './components/features/parent-dashboard/parent-dashboard.component';
import { TeacherDashboardComponent } from './components/features/teacher-dashboard/teacher-dashboard.component';
import { ParentChildrenComponent } from './components/features/parent-children/parent-children.component';
import { TeacherStudentsComponent } from './components/features/teacher-students/teacher-students.component';
import { TeacherClassesComponent } from './components/features/teacher-classes/teacher-classes.component';
import { TeacherCoursesListComponent } from './components/features/teacher-courses-list/teacher-courses-list.component';
import { TeacherEvalsListComponent } from './components/features/teacher-evals-list/teacher-evals-list.component';
import { CountUpPipe } from './core/pipes/count-up.pipe';
import { StudentTeachersComponent } from './components/features/student-teachers/student-teachers.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HeroBannerComponent,
    FunFactsComponent,
    HomeComponent,
    AboutComponent,
    CoursesComponent,
    BlogComponent,
    ContactComponent,
    TestimonialsComponent,
    UsersComponent,
    EvalsComponent,
    ClassesComponent,
    SignupComponent,
    LoginComponent,
    TeacherCoursesComponent,
    CourseFormComponent,
    CourseListComponent,
    CourseItemComponent,
    TeacherEvalsComponent,
    EvalFormComponent,
    EvalListComponent,
    EvalItemComponent,
    ProfileComponent,
    StudentCoursesComponent,
    StudentClassComponent,
    StudentEvalsComponent,
    ParentEvalsComponent,
    ParentSearchComponent,
    AdminAssignComponent,
    AdminCrudComponent,
    TeachersComponent,
    StudentDashboardComponent,
    AdminDashboardComponent,
    ParentDashboardComponent,
    TeacherDashboardComponent,
    ParentChildrenComponent,
    TeacherStudentsComponent,
    TeacherClassesComponent,
    TeacherCoursesListComponent,
    TeacherEvalsListComponent,
    CountUpPipe,
    StudentTeachersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule, // déjà importé pour signup / login
    FormsModule // 👈 nécessaire pour [(ngModel)]
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
