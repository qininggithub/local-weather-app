import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [
    MatButtonModule,
    MatInputModule,
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
  ],
  exports: [
    MatButtonModule,
    MatInputModule,
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
  ],
  declarations: []
})
export class MaterialModule { }
