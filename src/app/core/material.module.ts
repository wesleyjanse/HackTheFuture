import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule, MatIconModule, MatSidenavModule, 
         MatListModule, MatButtonModule, MatCardModule, MatGridListModule, 
         MatBadgeModule, MatProgressSpinnerModule, MatExpansionModule,
         MatSlideToggleModule, MatTooltipModule, MatStepperModule, MatDialogModule,
         MatAutocompleteModule, MatChipsModule, MatSnackBarModule, MatTabsModule, MatTableModule,
         MatPaginatorModule
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
    MatSortModule,
    MatPaginatorModule
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
    MatSortModule,
    MatPaginatorModule
  ]
})
export class MaterialModule { }
