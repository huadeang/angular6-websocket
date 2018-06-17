import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  ws: WebSocket;

  constructor() { }

  createObservableSocket(url:string):Observable<string>{

    this.ws = new WebSocket(url);

    return new Observable(server=>{
      this.ws.onmessage = event=> server.next(event.data);
      this.ws.onerror = event => server.error(event);
      this.ws.onclose = event => server.complete();
    });
  }

  sendMessage(message:any){
    console.log(`send message ${message} to server.` );
    this.ws.send(message);
  }

}
