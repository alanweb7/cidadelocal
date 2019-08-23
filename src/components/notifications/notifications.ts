import { Component } from '@angular/core';
import { Events } from 'ionic-angular';
/**
 * Generated class for the NotificationsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'notifications',
  templateUrl: 'notifications.html'
})

export class NotificationsComponent {
  notification_count: number;
  notificationx: number = 777;
  constructor(private events: Events) {

    this.notification_count = 0;
  }

  publishEvent(){
    this.notification_count++;
    this.events.publish('notify',this.notification_count);
  }



}
