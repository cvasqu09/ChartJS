import { NgModule } from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';
// tslint:disable-next-line:max-line-length
import { MatButtonModule, MatInputModule, MatFormFieldModule, MatCardModule, MatToolbar, MatToolbarModule, MatListModule, MatDividerModule, MatIconModule, MatTableModule, MatPaginatorModule } from '@angular/material';

@NgModule({
  declarations: [
  ],
  imports: [
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatDividerModule,
    MatCardModule,
    MatListModule,
    MatToolbarModule,
    MatIconModule,
    FlexLayoutModule,
    MatTableModule,
    MatPaginatorModule,
  ],
  exports: [
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatDividerModule,
    MatCardModule,
    MatListModule,
    MatToolbarModule,
    MatIconModule,
    FlexLayoutModule,
    MatTableModule,
    MatPaginatorModule,
  ],
  providers: [],
  bootstrap: []
})
export class AngularMaterialModule {}
