import { Component, OnInit } from "@angular/core";
import { UserService } from "../services/user-service.service";
import { ActivatedRoute, Router } from "@angular/router";
import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";
import { Subscription } from "rxjs";

@Component({
  selector: "app-main-layout",
  templateUrl: "./main-layout.component.html",
  styleUrls: ["./main-layout.component.css"]
})
export class MainLayoutComponent implements OnInit {
  data = [];
  data1 = [];
  model: any;
  collapse = false;
  config: any;
  urlData = [];
  urlArray = [];
  repoArray = [];
  sampleArray = [];
  newArray = [];
  repo: Subscription;
  dataValue:any;
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
      console.log(this.data);
      this.data = data;
      this.data.forEach(element => {
        this.urlData.push(element.url);
        this.userService.getUserName(element.url).subscribe(res => {
          this.urlArray.push(res["name"]);
        });
      });
    });

    this.route.queryParamMap
      .map(params => params.get("page"))
      .subscribe(page => (this.config.currentPage = page));
  }
  callType(val) {
    console.log(val);
  }

  onCollapse(val) {
    this.sampleArray = [];
    this.newArray = [];
    this.dataValue = val;
    console.log(val);
    this.repo = this.userService.getRepo(val.repos_url).subscribe(val1 => {
      this.newArray.push(val1);
      this.newArray.forEach(data => {
        data.forEach(data1 => {
          this.sampleArray.push(data1.name);
        });
      });
    });
    if (this.collapse && this.dataValue === val) {
      this.collapse = false;
      this.repo.unsubscribe();
    } else {
      this.collapse = true;
    }
  }

  pageChange(newPage: number) {
    this.router.navigate([""], { queryParams: { page: newPage } });
  }
}
