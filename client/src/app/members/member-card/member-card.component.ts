import { Component, Input } from '@angular/core';
import {Member} from "../../_models/members";
import { OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MemberCardComponent implements OnInit {
  @Input() member: Member | undefined;

  constructor() {

  }
  ngOnInit(): void {

  }
}
