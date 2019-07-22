import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { OverlayModule } from '@angular/cdk/overlay';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { WinnerDialogComponent } from './winner-dialog/winner-dialog.component';
import { TieDialogComponent } from './tie-dialog/tie-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    WinnerDialogComponent,
    TieDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    OverlayModule,
    FormsModule,
    MatDialogModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    WinnerDialogComponent,
    TieDialogComponent
  ]
})
export class AppModule { }
