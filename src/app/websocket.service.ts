import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// import * as jwt from 'jsonwebtoken';

//import { WebSocket } from 'websocket';


@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  //ws: WebSocket;
  ws : WebSocket;
  url:string = 'ws:/localhost:8999';



  constructor() { }

  createObservableSocket():Observable<string>{
   /*
    var token =jwt.sign({name:'bank'},'welcome',{
      expiresIn : 60 * 60 * 1000 //expire in 1 hour
    });
    */

    var token = 'fake-token';

    var msg = {
      type: 'authenticate',
      payload: { token: token }
    };

    this.ws = new WebSocket(this.url);
    //this.ws = new WebSocketCilent()

    return new Observable(server=>{
      this.ws.onmessage = event=> server.next(event.data);
      this.ws.onerror = event => server.error(event);
      this.ws.onclose = event => server.complete();
      /*this.ws.onopen = event =>{
        this.ws.send(JSON.stringify(msg));
      }
      */
    });
  }

  sendMessage(message:any){
    console.log(`send message ${message} to server.` );
    this.ws.send(message);
  }

}
