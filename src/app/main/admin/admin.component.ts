import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  listSelected = true;

  constructor(private activatedRoute: ActivatedRoute) {
    this.listSelected = this.activatedRoute.snapshot.data['listSelected'];
  }

  ngOnInit(): void {
  }

}
