import { Component, OnInit } from '@angular/core';

import { WebsocketService } from '../websocket.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  serverMsg:string;
  msg:string;
  url:string = 'ws:/localhost:8999';

  constructor(private wss:WebsocketService) { 
    
  }

  ngOnInit() {
    this.wss.createObservableSocket(this.url)
    .subscribe(message=>{
      console.log(`Message ${message} received.`);
      this.serverMsg = message;
    });
  }

  send(){
    this.wss.sendMessage(this.msg);
  }

}
