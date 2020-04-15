import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { IJobListing } from './jobListing'
import { JobRolesService } from './job-roles.service'
import { Form } from "@angular/forms"

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
  role = this.route.snapshot.paramMap.get('level');
  
  constructor(private jobRolesService: JobRolesService ,
    private route: ActivatedRoute, private router: Router) {

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

   
    this.jobRolesService.getRoleByLang(this.role, (resultRole) => {
      console.log(this.role)
      console.log("role are", resultRole);
      console.log(resultRole.company);
    })

  } 

  performFilter(filterBy: string): IJobListing[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.jobRoles.filter((jobRole: IJobListing) =>
      jobRole.role.toLocaleLowerCase().indexOf(filterBy) !== -1)

  }


}
