import { Component, OnInit } from '@angular/core';
import { IJobListing } from './jobListing'
import { JobRolesService } from './job-roles.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'static-job-listings';
  showImage: boolean = false;
  logoUrl: string = '../assets/'

  _listFilter: string;
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredRoles = this.listFilter ? this.performFilter(this.listFilter) : this.jobRoles;
  }

  errorMsg: string;
  filteredRoles: IJobListing[];
  jobRoles: IJobListing[] = [];
  constructor(private jobRolesService: JobRolesService) {

  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }
  ngOnInit() {

    this.jobRolesService.getRoles().subscribe(
      jobRoles => {
        this.jobRoles = jobRoles;
        this.filteredRoles = this.jobRoles;
        
      },
      error => this.errorMsg = <any>error
    );

  }

  performFilter(filterBy: string): IJobListing[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.jobRoles.filter((role: IJobListing) =>
      role.role.toLocaleLowerCase().indexOf(filterBy) !== -1)

  }


}
