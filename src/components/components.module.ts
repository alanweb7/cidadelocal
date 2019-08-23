import { NgModule } from '@angular/core';
import { ProgressBarComponent } from './progress-bar/progress-bar';
import { NotificationsComponent } from './notifications/notifications';
@NgModule({
	declarations: [ProgressBarComponent,
    NotificationsComponent],
	imports: [],
	exports: [ProgressBarComponent,
    NotificationsComponent]
})
export class ComponentsModule {}
