import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  constructor(private chatService: ChatService) { }

  messages$ = this.chatService.chatMessages$;
  ngOnInit(): void {
  }

  loginForm = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    message: new FormControl(null, [Validators.required])
  });

  SendMessage() {
    if (this.loginForm.valid) {
      this.chatService.sendMessage(this.loginForm.value.name, this.loginForm.value.message)
    }
  }
}
