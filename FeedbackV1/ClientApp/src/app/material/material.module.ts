import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as Material from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';







@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    Material.MatTableModule,
    Material.MatIconModule,
    Material.MatPaginatorModule,
    Material.MatSortModule,
    BrowserAnimationsModule,
    Material.MatFormFieldModule


  ],
  exports : [
    Material.MatTableModule,
    Material.MatIconModule,
    Material.MatPaginatorModule,
    Material.MatSortModule,
    BrowserAnimationsModule,
    Material.MatFormFieldModule

  ]

})
export class MaterialModule { }
