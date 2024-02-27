import { NgModule } from '@angular/core';

import { AutoCompleteModule } from 'primeng/autocomplete';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DataViewModule } from 'primeng/dataview';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { GalleriaModule } from 'primeng/galleria';
import { ImageModule } from 'primeng/image';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { RippleModule } from 'primeng/ripple';
import { SidebarModule } from 'primeng/sidebar';
import { ToolbarModule } from 'primeng/toolbar';

@NgModule({
  exports: [
    AutoCompleteModule,
    AvatarModule,
    ButtonModule,
    CalendarModule,
    DataViewModule,
    DialogModule,
    DropdownModule,
    FileUploadModule,
    GalleriaModule,
    ImageModule,
    InputNumberModule,
    InputTextareaModule,
    ProgressSpinnerModule,
    RippleModule,
    SidebarModule,
    ToolbarModule,
  ]
})
export class PrimeNgModule { }
