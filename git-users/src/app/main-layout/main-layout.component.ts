import { Component, OnInit } from "@angular/core";
import { UserService } from "../services/user-service.service";
import { ActivatedRoute, Router } from "@angular/router";
import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";
import { Subscription } from "rxjs";
import { Observable } from "rxjs";
import { debounceTime, map } from "rxjs/operators";

@Component({
  selector: "app-main-layout",
  templateUrl: "./main-layout.component.html",
  styleUrls: ["./main-layout.component.css"]
})
export class MainLayoutComponent implements OnInit {
  userData: any;
  data1 = [];
  totalData = [];
  model: any;
  collapse = false;
  config: any;
  urlData = [];
  urlArray = [];
  repoArray = [];
  sampleArray = [];
  newArray = [];
  repo: Subscription;
  dataValue: any;
  viewSet: any;
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
      // console.log(this.userData);
      this.userData = data;
      this.totalData = this.userData;
      this.userData.forEach(element => {
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
    if (val === "1") {
      //sort by name a to z
      console.log(this.totalData.sort());
    } else if (val === "2") {
      //sort by name z to a
      console.log(this.totalData.sort().reverse());
    } else if (val === "3") {
      //sort by rank up
    } else if (val === "4") {
      //sort by rank down
    }
  }

  onCollapse(val, i) {
    this.sampleArray = [];
    this.newArray = [];
    this.dataValue = val;
    this.repo = this.userService.getRepo(val.repos_url).subscribe(val1 => {
      this.newArray.push(val1);
      this.newArray.forEach(data => {
        data.forEach(data1 => {
          console.log(data1.language);
          this.sampleArray.push({ name: data1.name, language: data1.language });
        });
      });
    });
    if (this.collapse && this.viewSet === i) {
      this.collapse = false;
      this.viewSet = null;
      this.repo.unsubscribe();
      return;
    } else if (!this.collapse && this.viewSet == (null || undefined)) {
      this.collapse = true;
      this.viewSet = i;
      return;
    }
  }

  pageChange(newPage: number) {
    this.router.navigate([""], { queryParams: { page: newPage } });
  }

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      map(term =>
        term === ""
          ? []
          : this.userData
              .filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)
              .slice(0, 10)
      )
    );

  formatter = (x: { name: string }) => x.name;
}
