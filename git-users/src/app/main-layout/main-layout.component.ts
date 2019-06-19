import { Component, OnInit } from "@angular/core";
import { UserServiceService } from "../services/user-service.service";

@Component({
  selector: "app-main-layout",
  templateUrl: "./main-layout.component.html",
  styleUrls: ["./main-layout.component.css"]
})
export class MainLayoutComponent implements OnInit {
  data: any;
  data1 = [];
  model: any;
  collapse = false;

  constructor(private userService: UserServiceService) {}

  ngOnInit() {
    this.userService.getData().subscribe(data => {
      this.data = data;
      console.log(this.data);
      this.data.forEach(element => {
        this.data1.push(element.login);
      });
    });
    console.log(this.data1);
    console.log(this.data1.length);
    let sort1 = this.data1.sort();
    console.log(sort1);
    let sort2 = sort1.reverse();
    console.log(sort2);
  }

  callType(val) {
    console.log(val);
  }
  onCollapse(){
    if(this.collapse){
      this.collapse = false;
    }else{
      this.collapse = true;
    }

  }
}
