import { Component, OnInit } from '@angular/core';
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';

import { WebsocketService } from '../websocket.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
  //animations
  animations: [
    trigger('listStagger', [
      transition('* <=> *', [
        query(
          ':enter',
          [
            style({ opacity: 0, transform: 'translateY(-15px)' }),
            stagger(
              '50ms',
              animate(
                '550ms ease-out',
                style({ opacity: 1, transform: 'translateY(0px)' })
              )
            )
          ],
          { optional: true }
        ),
        query(':leave', animate('50ms', style({ opacity: 0 })), {
          optional: true
        })
      ])
    ])
  ],
  
})
export class MessageComponent implements OnInit {
  serverMsg:string;
  msg:string;
  message$:Array<any>;
  startAnimate:boolean = false;
  //url:string = 'ws:/localhost:8999';

  constructor(private wss:WebsocketService) { 
    
  }

  ngOnInit() {
    this.wss.createObservableSocket()
    .subscribe(message=>{
      console.log(`Message ${message} received.`);
      this.serverMsg = message;
      if(!this.message$){
        this.message$ = new Array();
      }
      this.message$.push(message);
      this.startAnimate = true;
    });
  }

  animationStarted($event){
    console.log('Animation started.');
    //this.animateStated = true;
  }

  animationDone($event){
    console.log('Animation done.');
    this.startAnimate = false;
  }

  send(){
    this.wss.sendMessage(this.msg);
  }

}
