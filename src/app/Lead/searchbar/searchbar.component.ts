import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, switchMap, takeUntil, tap } from 'rxjs/operators';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent implements OnInit {
  searchControl = new FormControl('');
  searchResults: any = { users: [], applications: [], trackers: [] };
  private destroy$ = new Subject<void>();
  showNoDataFound = false;

  constructor(private searchService: SearchService,private cdr: ChangeDetectorRef) { }


  ngOnInit(): void {
    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(term => {
        if (!term || term.trim().length === 0) {
          this.resetSearchResults();
        }
      }),
      filter((term: string | null): term is string => 
        term !== null && term.trim().length > 0
      ),
      switchMap(term => this.searchService.search(term.trim())),
      takeUntil(this.destroy$)
    ).subscribe(
      results => {
        this.searchResults = results;
        this.showNoDataFound = this.isNoDataFound();
        this.cdr.detectChanges();
      },
      error => {
        console.error('Error in search:', error);
      }
    );
  }
  
  private resetSearchResults(): void {
    this.searchResults = { users: [], applications: [], trackers: [] };
    this.showNoDataFound = false;
    this.cdr.detectChanges();
  }

  private isNoDataFound(): boolean {
    return !!this.searchControl.value && 
           (this.searchControl.value?.trim() ?? '') !== '' && 
           !this.searchResults.users.length && 
           !this.searchResults.applications.length && 
           !this.searchResults.trackers.length;
  }
  getRoleName(roleName: string): string {
    switch (roleName) {
      case 'ROLE_ADMIN':
        return 'Admin';
      case 'ROLE_MEMBER':
        return 'Member';
      case 'ROLE_LEAD':
        return 'Lead';
      default:
        return roleName; 
    }
  }

  hasValidRole(user: any): boolean {
    return user.roles.some((role: any) => ['ROLE_LEAD', 'ROLE_MEMBER'].includes(role.name));
  }
  

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  clearSearch() {
    this.searchControl.setValue('');
  }
}