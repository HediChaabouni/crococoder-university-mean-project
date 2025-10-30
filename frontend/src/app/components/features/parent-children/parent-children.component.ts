import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { User } from 'src/app/core/models/user';

@Component({
  selector: 'app-parent-children',
  templateUrl: './parent-children.component.html',
  styleUrls: ['./parent-children.component.css']
})
export class ParentChildrenComponent implements OnInit {

  children: User[] = [];
  msg = '';
  loading = false;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loadChildren();
  }

  private loadChildren(): void {
    const parent = JSON.parse(localStorage.getItem('user') || 'null');

    if (!parent || parent.role !== 'parent') {
      this.msg = '❌ Access denied. You must be logged in as a parent.';
      return;
    }

    this.loading = true;
    this.userService.getChildrenByParent(parent._id).subscribe({
      next: (res) => {
        this.children = res;
        this.loading = false;
        if (this.children.length === 0) {
          this.msg = 'No children registered for this account yet.';
        }
      },
      error: (err) => {
        this.msg = err.error?.message || '❌ Error loading children.';
        this.loading = false;
      }
    });
  }

  getClassName(child: any): string {
    const firstClass = child?.classIds?.[0];
    return typeof firstClass === 'object' && firstClass?.className
      ? firstClass.className
      : '—';
  }

  getClassYear(child: any): string {
    const firstClass = child?.classIds?.[0];
    return typeof firstClass === 'object' && firstClass?.classYear
      ? firstClass.classYear
      : '—';
  }

}

