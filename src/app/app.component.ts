import { Component } from '@angular/core';
import * as Stomp from 'stompjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  showConversation: boolean = false;
  ws: any;
  name: string;
  disabled: boolean;
  greetings: string[] = [];
  constructor() { }

  connect() {
    let socket = new WebSocket("ws://localhost:8080/notification");
    this.ws = Stomp.over(socket);
    let that = this;
    this.ws.connect({}, function (frame) {
      that.ws.subscribe("/app/errors", function (message) {
        alert("Error " + message);
      });
      that.ws.subscribe("/topic/reply", function (message) {
        console.log(message)
        that.showGreeting(message.body);
      });
      that.disabled = true;
    }, function (error) {
      alert("STOMP error " + error);
    });
  }
  sendName() {
    let data = JSON.stringify({
      'name': this.name
    })
    this.ws.send("/app/message", {}, data);
  }
  showGreeting(message) {
    this.showConversation = true;
    this.greetings.push(message)
  }
  setConnected(connected) {
    this.disabled = connected;
    this.showConversation = connected;
    this.greetings = [];
  }
}
