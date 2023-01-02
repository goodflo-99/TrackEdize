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

@NgModule({
  providers: [IssueService],
  declarations: [
    BugViewComponent,
    IssuesComponent,
    CommentSectionComponent
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
    RouterModule.forRoot([
      { path: 'issues', component: IssuesComponent, pathMatch: 'full', children: [
        
      ] },
      { path: 'issues/bug-view', component: BugViewComponent},
      { path: 'issues/bug-view/:id', component: BugViewComponent}
    ]),
  ]
})
export class TrackingModule { }
