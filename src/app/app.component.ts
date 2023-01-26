import { Component, OnInit } from '@angular/core';
import { SignalrService } from './signalr.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'TestElectronApp';
  hubHelloMessage: string;

  constructor(public signalrService: SignalrService) {
    this.hubHelloMessage = '';
  }

  ngOnInit(): void {  
    this.signalrService.hubHelloMessage.subscribe((hubHelloMessage: string) => {
      this.hubHelloMessage = hubHelloMessage;
    });

    this.signalrService.connection
      .invoke('Hello')
      .catch((error: any) => {
        console.log(`SignalrDemoHub.Hello() error: ${error}`);
        alert('SignalrDemoHub.Hello() error!, see console for details.');
      }
    ); 
  }
}
