import { NgModule } from '@angular/core';

import { AutoCompleteModule } from 'primeng/autocomplete';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { ImageModule } from 'primeng/image';
import { RippleModule } from 'primeng/ripple';
import { SidebarModule } from 'primeng/sidebar';
import { ToolbarModule } from 'primeng/toolbar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@NgModule({
  exports: [
    AutoCompleteModule,
    AvatarModule,
    ButtonModule,
    DataViewModule,
    ImageModule,
    RippleModule,
    SidebarModule,
    ToolbarModule,
    ProgressSpinnerModule,
  ]
})
export class PrimeNgModule { }
