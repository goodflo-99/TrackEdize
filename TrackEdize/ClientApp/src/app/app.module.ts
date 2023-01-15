import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

// MDB Modules
import { MdbAccordionModule } from 'mdb-angular-ui-kit/accordion';
import { MdbCarouselModule } from 'mdb-angular-ui-kit/carousel';
import { MdbCheckboxModule } from 'mdb-angular-ui-kit/checkbox';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { MdbPopoverModule } from 'mdb-angular-ui-kit/popover';
import { MdbRadioModule } from 'mdb-angular-ui-kit/radio';
import { MdbRangeModule } from 'mdb-angular-ui-kit/range';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { MdbScrollspyModule } from 'mdb-angular-ui-kit/scrollspy';
import { MdbTabsModule } from 'mdb-angular-ui-kit/tabs';
import { MdbTooltipModule } from 'mdb-angular-ui-kit/tooltip';
import { MdbValidationModule } from 'mdb-angular-ui-kit/validation';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//PrimeNG
import {RadioButtonModule} from 'primeng/radiobutton';
import { ButtonModule } from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';
import {SelectButtonModule} from 'primeng/selectbutton';
import {SidebarModule} from 'primeng/sidebar';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { Page404Component } from './components/page404/page404.component';
import { ApiAuthorizationModule } from 'src/api-authorization/api-authorization.module';
import { AuthorizeGuard } from 'src/api-authorization/authorize.guard';
import { AuthorizeInterceptor } from 'src/app/common/interceptors/authorize.interceptor';
import { TrackingModule } from './tracking/tracking.module';
import { BugViewComponent } from './tracking/bug-view/bug-view.component';
import { TextareaAutoresizeDirective } from './shared/textarea-autoresize/textarea-autoresize.directive';
import { SharedModule } from './shared/shared.module';
import { ProjectModule } from './project/project.module';
import { ProjectsComponent } from './project/projects/projects.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { AccountPageComponent } from './components/account-page/account-page.component';
import { AuthGuard } from './common/guards/auth.guard';
import { JwtModule } from '@auth0/angular-jwt';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ChatModule } from './chat/chat.module';
import { LogoComponent } from './components/nav-menu/logo/logo.component';
import { MessageFloatComponent } from './components/message-float/message-float.component';
import { AccountService } from './services/account.service';

export function tokenGetter() {
  return localStorage.getItem("jwt");
}

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    Page404Component,
    SignInComponent,
    AccountPageComponent,
    SignUpComponent,
    LogoComponent,
    MessageFloatComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ApiAuthorizationModule,
    TrackingModule,
    RouterModule.forRoot([
      { path: '', component: DashboardComponent, pathMatch: 'full', canActivate: [AuthGuard] },
      { path: 'sign-in', component: SignInComponent },
      { path: 'sign-up', component: SignUpComponent },
      { path: 'account-page', component: AccountPageComponent, canActivate: [AuthGuard] },
      { path: '**', component: Page404Component },
    ]),
    MdbAccordionModule,
    MdbCarouselModule,
    MdbCheckboxModule,
    MdbCollapseModule,
    MdbDropdownModule,
    MdbFormsModule,
    MdbModalModule,
    MdbPopoverModule,
    MdbRadioModule,
    MdbRangeModule,
    MdbRippleModule,
    MdbScrollspyModule,
    MdbTabsModule,
    MdbTooltipModule,
    MdbValidationModule,
    BrowserAnimationsModule,
    SharedModule,
    ProjectModule,
    DashboardModule,
    RadioButtonModule,
    ButtonModule,
    DropdownModule,
    SelectButtonModule,
    SidebarModule,
    ChatModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:7294"],
        headerName: "Authrorization"
      }
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthorizeInterceptor, multi: true },
    AccountService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
