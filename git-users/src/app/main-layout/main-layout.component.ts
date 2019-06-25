import { Component, OnInit } from "@angular/core";
import { UserService } from "../services/user-service.service";
import { ActivatedRoute, Router } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

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
  config: any;

  constructor(private userService: UserService,
              private router: Router,
              private route :ActivatedRoute ) {
                this.config = {
                  currentPage: 1,
                  itemsPerPage: 3
            };
              }

  ngOnInit() {
    this.userService.getData().subscribe(data => {
      this.data = data;
      console.log(this.data);
      this.data.forEach(element => {
        this.data1 = element.login;
      });
    });
    console.log(this.data1);
    console.log(this.data1.length);
    let sort1 = this.data1.sort();
    console.log(sort1);
    let sort2 = sort1.reverse();
    console.log(sort2);
    this.route.queryParamMap
    .map(params => params.get('page'))
    .subscribe(page => this.config.currentPage = page);
  }

  callType(val) {
    console.log(val);
  }
  onCollapse(i){
    if(this.collapse){
      this.collapse = false;
    }else{
      this.collapse = true;
    }

  }
  pageChange(newPage: number) {
    this.router.navigate([''], { queryParams: { page: newPage } });
  }
}
