import { Component, OnInit, Input} from '@angular/core';
import { Feedback } from 'src/app/_models/feedback.model';
import { User } from 'src/app/_models/user';
import { ActivatedRoute} from '@angular/router';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyService } from 'src/app/_services/alertify.service';



@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css'],
})
export class FeedbackComponent implements OnInit {
  receiver: any = {};
  requester: any = {};
  @Input() feedbackInput: Feedback;

  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private alertify: AlertifyService) {}


  ngOnInit() {
    this.userService.getUsersCached(users => {
      users.forEach((user: User, index: number, array: User[]) => {
        if (user.id === this.feedbackInput.iD_receiver) {
          this.receiver = user;
        }
        if (user.id === this.feedbackInput.iD_manager) {
          this.requester = user;
        }
      });
    });
  }

}
