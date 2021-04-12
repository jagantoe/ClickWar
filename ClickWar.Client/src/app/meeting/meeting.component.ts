import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MeetingService } from '../meeting.service';

@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.scss']
})
export class MeetingComponent {

  constructor(private meetingService: MeetingService) { }

  meetingState$ = this.meetingService.meetingState$;

  meetingForm = new FormGroup({
    meeting: new FormControl(null, [Validators.required]),
    role: new FormControl(null, [Validators.required]),
    device: new FormControl(null, [Validators.required])
  });


  joinMeeting() {
    console.log(+this.meetingForm.get("meeting").value, +this.meetingForm.get("role").value, +this.meetingForm.get("device").value);
    this.meetingService.joinMeeting(+this.meetingForm.get("meeting").value, +this.meetingForm.get("role").value, +this.meetingForm.get("device").value);
  }

  textForm = new FormGroup({
    text: new FormControl(null, [Validators.required]),
  });

  addText() {
    console.log(this.textForm.get("text").value);
    this.meetingService.addText(this.textForm.get("text").value);
  }
}
