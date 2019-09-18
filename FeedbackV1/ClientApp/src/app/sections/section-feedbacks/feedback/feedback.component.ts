import { Component, OnInit, Input} from '@angular/core';
import { Feedback } from 'src/app/_models/feedback.model';
import { User } from 'src/app/_models/user';
import { ActivatedRoute, Params } from '@angular/router';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css'],
})
export class FeedbackComponent implements OnInit {
  receiver: User = null;
  requester: User = null;
  @Input() feedbackInput: Feedback;

  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private alertify: AlertifyService,
              private http: HttpClient)
  {
    //this.userService.getUsers().subscribe(response => {
    //  this.users = response;
    //  let x: string;
    //  for (var item in this.users) {
        
    //    //if (this.feedbackInput.iD_receiver ==  )
    //      console.log(item);
    //  }
    
    //});


  }

  ngOnInit() {
    //this.loadUsers();
    this.userService.getUsersCached(users => {
      users.forEach((user: User, index: number, array: User[]) => {
        if (user.id == this.feedbackInput.iD_receiver)
          this.receiver = user;
        if (user.id == this.feedbackInput.iD_manager)
          this.requester = user;
      });
    });
   
    //console.log(this.users);
  }

}
