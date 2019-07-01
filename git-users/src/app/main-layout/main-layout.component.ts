import { Component, OnInit } from "@angular/core";
import { UserService } from "../services/user-service.service";
import { ActivatedRoute, Router } from "@angular/router";
import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";

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
  urlData = [];
  urlArray = [];
  repoArray = [];
  sampleArray = [];
  newArray = [];
  // data1: Array<string>;

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {
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
        this.data1.push(element.login);
        this.urlData.push(element.url);
        // element.url.forEach(val => {
        this.userService.getUserName(element.url).subscribe(res => {
          console.log(res);
          // this.urlArray.push(res.name);
        });
      });
    this.data.forEach(element => {
        this.userService.getRepo(element.repos_url).subscribe(val1 => {
          console.log(val1);
          this.repoArray.push(val1);
        });
        this.repoArray.forEach(ele => {
          debugger;
          ele.forEach(val=>{
            console.log(val);
              this.newArray.push(val.name);
          });
        });
        });
    });
    console.log(this.urlData);
    console.log(this.urlArray);


    console.log(this.newArray);
    // if (this.data1) {
    //   console.log(this.data1);
    //   // console.log(this.data1.length);
    //   let sort1 = [];
    //   console.log(sort1.push(this.data1.sort()));
    //   let sort2 = sort1.reverse();
    //   console.log(sort2);
    // }

    this.route.queryParamMap
      .map(params => params.get("page"))
      .subscribe(page => (this.config.currentPage = page));
  }
  callType(val) {
    console.log(val);
  }
  onCollapse(i) {
    if (this.collapse) {
      this.collapse = false;
    } else {
      this.collapse = true;
    }
  }
  pageChange(newPage: number) {
    this.router.navigate([""], { queryParams: { page: newPage } });
  }
}
