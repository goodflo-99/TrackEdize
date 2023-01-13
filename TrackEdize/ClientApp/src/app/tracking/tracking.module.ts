import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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
import {DropdownModule} from 'primeng/dropdown';
import {ButtonModule} from 'primeng/button';

import { BugViewComponent } from './bug-view/bug-view.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { IssueService } from './services/issue.service';
import { IssuesComponent } from './issues/issues.component';
import { RouterModule } from '@angular/router';
import { CommentSectionComponent } from './comment-section/comment-section.component';
import { CommentCardComponent } from './comment-section/comment-card/comment-card.component';
import { CardModule } from 'primeng/card';
import { AuthGuard } from '../common/guards/auth.guard';
import { MessageService } from 'primeng/api';

@NgModule({
  providers: [IssueService, MessageService],
  declarations: [
    BugViewComponent,
    IssuesComponent,
    CommentSectionComponent,
    CommentCardComponent
  ],
  imports: [
    CommonModule,
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
    DropdownModule,
    ButtonModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    DropdownModule,
    CardModule,
    RouterModule.forRoot([
      { path: 'issues', component: IssuesComponent, canActivate: [AuthGuard],  pathMatch: 'full', children: [
        
      ]},
      { path: 'issues/issue', component: BugViewComponent, children: [
        { path: ':id', component: BugViewComponent},
        { path: ':projectId', component: BugViewComponent}
      ]},
      // { path: 'issues/issue', component: BugViewComponent, children: [
      // ]},
    ]),
  ]
})
export class TrackingModule { }
