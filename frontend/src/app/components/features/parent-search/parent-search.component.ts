
import { Component } from '@angular/core';
import { User } from 'src/app/core/models/user';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-parent-search',
  templateUrl: './parent-search.component.html'
})
export class ParentSearchComponent {
  query = '';
  results: User[] = [];
  errorMsg = '';
  loading = false;

  constructor(private userService: UserService) {}

  onSearch(): void {
    if (!this.query.trim()) return;
    this.loading = true;
    this.userService.searchChild(this.query).subscribe({
      next: (data) => (this.results = data),
      error: (err) => (this.errorMsg = err.error?.message || 'Search failed'),
      complete: () => (this.loading = false)
    });
  }
}
