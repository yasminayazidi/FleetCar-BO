import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CalendarAppRoutingModule } from './calendar.app-routing.module';
import { CalendarAppComponent } from './calendar.app.component';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { FullCalendarModule } from '@fullcalendar/angular';
import { EventService } from 'src/app/demo/service/event.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        CalendarAppRoutingModule,
        DialogModule,
        InputTextareaModule,
        ButtonModule,
        CalendarModule,
        InputTextModule,
        DropdownModule,
        ToastModule,
        RippleModule,
        FullCalendarModule,
    ],
    declarations: [CalendarAppComponent],
    providers: [EventService],
})
export class CalendarAppModule {}
