import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {
  versions: Version[] = [
    {
      version: 19,
      timestamp: '2017-04-02 12:42',
      user: 'Daniel01',
      data: [{
        label: 'title',
        value: 'Blogging about 2017'
      }, {
        label: 'released',
        value: '2017-06-03'
      }, {
        label: 'content',
        value: 'lorem ipsum dolor sit..'
      }]
    }, {
      version: 18,
      timestamp: '2017-03-28 17:04',
      user: 'Daniel01',
      data: [{
        label: 'title',
        value: 'Blogging about 2017'
      }, {
        label: 'released',
        value: '2017-06-03'
      }, {
        label: 'content',
        value: 'lorem ipsum dolor sit..'
      }]
    }, {
      version: 17,
      timestamp: '2017-03-26 08:09',
      user: 'Daniel01',
      data: [{
        label: 'title',
        value: 'Blogging about 2017'
      }, {
        label: 'released',
        value: '2017-06-03'
      }, {
        label: 'content',
        value: 'lorem ipsum dolor sit..'
      }]
    }, {
      version: 16,
      timestamp: '2017-03-25 10:25',
      user: 'Daniel01',
      data: [{
        label: 'title',
        value: 'Blogging about 2017'
      }, {
        label: 'released',
        value: '2017-06-03'
      }, {
        label: 'content',
        value: 'lorem ipsum dolor sit..'
      }]
    }
  ];

  selected: Version;
  focused: Version;

  constructor() {
  }

  selectOrDeselect($event, version) {
    this.selected = $event.checked ? version : undefined;
  }

  focusOrBlur(version) {
    this.focused = this.focused === version ? undefined : version;
  }
}

class Version {
  version: number;
  timestamp: string;
  user: string;
  data: [{
    label: string;
    value: string;
  }];
}