import { Component } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { User } from 'src/app/core/models/user';

@Component({
  selector: 'app-parent-search',
  templateUrl: './parent-search.component.html'
})
export class ParentSearchComponent {
  query = '';
  results: User[] = [];
  errorMsg = '';
  successMsg = '';
  loading = false;
  linking = false;

  constructor(private userService: UserService) {}

  onSearch(): void {
    if (!this.query.trim()) return;

    this.loading = true;
    this.errorMsg = '';

    const parent = this.userService.getCurrentUser();
    if (!parent || parent.role !== 'parent') {
      this.errorMsg = 'No parent connected.';
      this.loading = false;
      return;
    }

    const getLinkStatus = (child: User): 'you' | 'other' | null =>
      child.parentId === parent._id ? 'you' : child.parentId ? 'other' : null;

    this.userService.searchChild(this.query, parent._id).subscribe({
      next: (data) => {
        this.results = data.map((child) => ({
          ...child,
          alreadyLinked: getLinkStatus(child)
        }));
      },
      error: (err) => (this.errorMsg = err.error?.message || 'Search failed'),
      complete: () => (this.loading = false)
    });
  }

  onLink(childId: string): void {
    const parent = this.userService.getCurrentUser();
    if (!parent || parent.role !== 'parent') {
      this.errorMsg = 'Unauthorized action.';
      return;
    }

    this.linking = true;
    this.userService.linkChild(parent._id, childId).subscribe({
      next: (res) => {
        this.successMsg = res.message;
        this.results = this.results.map((r) =>
          r._id === childId ? { ...r, alreadyLinked: 'you' } : r
        );
      },
      error: (err) => (this.errorMsg = err.error?.message || 'Linking failed'),
      complete: () => (this.linking = false)
    });
  }
}
