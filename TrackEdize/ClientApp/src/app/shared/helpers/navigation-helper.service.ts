import { NavigationEnd, Router, Event, RouterEvent, NavigationStart} from "@angular/router";
import { Injectable } from "@angular/core";
import { filter } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
export class NavigationHelperService {
    private previousUrl: string = "";
  private currentUrl: string = "";

    constructor(private router : Router) {
        this.currentUrl = router.url;
        router.events
        .pipe(filter((event: Event) : event is NavigationEnd => event instanceof NavigationEnd))
        .subscribe((event: NavigationEnd) => {
            this.previousUrl = this.currentUrl;
            this.currentUrl = event.url;
        });    
    }

    public navigateToProjects() {
        this.router.navigate(['/projects']);        
    }

    public navigateToIssue(id?: string) {
        if(!id) return;
        this.router.navigate([`/issues/issue/`], {queryParams: {id: id}});        
    }

    public toNewIssue(projectId?: string) {
        this.router.navigate([`/issues/create-issue`], {queryParams: {projectId: projectId}});        
    }

    public toDashboard() {
        this.router.navigate([`/dashboard`]);
    }

    public back() {
        this.router.navigate([this.previousUrl]);
    }

    public toSignIn() {
        this.router.navigate([`/sign-in`]);
    }

    public navigateToSprint(id?: string) {
        if(!id) return;
        this.router.navigate([`/sprints/sprint/`], {queryParams: {id: id}});        
    }

    public toNewSprint(projectId?: string) {
        this.router.navigate([`/sprints/create-sprint`], {queryParams: {projectId: projectId}});        
    }
}