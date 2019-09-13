
import { Component, OnInit, Input } from '@angular/core';
import { Feedback } from 'src/app/_models/feedback.model';
import { User } from '../../../../_models/user';
import { UserService } from '../../../../_services/user.service';



@Component({
  selector: 'app-feedback-item',
  templateUrl: './feedback-item.component.html',
  styleUrls: ['./feedback-item.component.css']
})
export class FeedbackItemComponent implements OnInit {
@Input() feedback: Feedback;
@Input() index: number;
  receiver: any = {};
  requester: any = {};

  constructor(private userService: UserService) {}

  ngOnInit() {
    console.log(this.feedback);
    this.userService.getUsersCached(users => {
      users.forEach((user: User, index: number, array: User[]) => {
        if (user.id === this.feedback.id) {
          this.receiver = user;
        }
        if (user.id === this.feedback.iD_manager && this.feedback.iD_manager != null) {
          this.requester = user;
        }
      });
    });
  }

}
