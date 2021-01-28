import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SignalrService } from '../signalr.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private signalrService: SignalrService) { }

  ngOnInit(): void {
  }

  loginForm = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    team: new FormControl(null, [Validators.required])
  });

  Start() {
    if (this.loginForm.valid) {
      this.signalrService.joinTeam(this.loginForm.value.name, this.loginForm.value.team)
    }
  }
}
