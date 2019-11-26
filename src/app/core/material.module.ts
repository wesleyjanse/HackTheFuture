import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule, MatIconModule, MatSidenavModule, 
         MatListModule, MatButtonModule, MatCardModule, MatGridListModule, 
         MatBadgeModule, MatProgressSpinnerModule, MatExpansionModule,
         MatSlideToggleModule, MatTooltipModule, MatStepperModule, MatDialogModule,
         MatAutocompleteModule, MatChipsModule, MatSnackBarModule, MatTabsModule, MatTableModule
          } from  '@angular/material';
          import {MatSortModule} from '@angular/material/sort';


@NgModule({
  imports: [
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatGridListModule,
    MatBadgeModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatSlideToggleModule,
    MatTooltipModule,
    MatStepperModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatSnackBarModule,
    MatTabsModule,
    MatTableModule,
    MatSortModule
  ],
  exports: [
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule, 
    MatCardModule,
    MatGridListModule,
    MatBadgeModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatSlideToggleModule,
    MatTooltipModule,
    MatStepperModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatSnackBarModule,
    MatTabsModule,
    MatTableModule,
    MatSortModule
  ]
})
export class MaterialModule { }
