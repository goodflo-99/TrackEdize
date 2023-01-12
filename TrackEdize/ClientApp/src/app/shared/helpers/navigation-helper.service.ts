import { Router } from "@angular/router";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })
export class NavigationHelperService {

    constructor(private router : Router) {

    }

    public navigateToProjects() {
        this.router.navigate(['/projects']);        
    }

    public navigateToIssue(id: string) {
        this.router.navigate([`/issues/bug-view/${id}`]);        
    }

    public toNewIssue(projectId?: string) {
        this.router.navigate([`/issues/bug-view`], {queryParams: {projectId: projectId}});        
    }

    public toDashboard() {
        this.router.navigate([`/dashboard`]);
    }
}