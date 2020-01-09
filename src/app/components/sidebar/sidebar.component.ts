import { Component, OnInit, HostListener } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
declare var $: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  currentTab: any;

  constructor() { }

  showAddQuickLinkFlag: boolean;
  addQuickLinksForm: FormGroup;
  toggleSideBar: boolean = false;
  currentParentTab: string;
  activeMenu: boolean;
  sidebarMenuData: any = [
    { "id": 1, 'name': 'Messages', 'url': '', 'icon': 'fa-dashboard' },
    {
      "id": 2,
      'name': 'About Us', 'url': 'about-us', 'icon': 'fa-university', 'subMenus': [
        { "id": 1, 'name': 'Mission', 'url': 'mission', 'icon': 'fa-user' },
        { "id": 2, 'name': 'vision', 'url': 'vision', 'icon': 'fa-user' },
      ]
    },
    { "id": 3, 'name': 'Admissions', 'url': 'admissions', 'icon': 'fa-plus' },
    { "id": 4, 'name': 'Announcements', 'url': 'announcements', 'icon': 'fa-bell' },
    { "id": 5, 'name': 'Clubs', 'url': 'clubs', 'icon': 'fa-users' },
    {
      "id": 6,
      'name': 'Settings', 'url': 'settings', 'icon': 'fa-gear', 'subMenus': [
        { "id": 1, 'name': 'Profile', 'url': 'profile', 'icon': 'fa-user' },
        { "id": 2, 'name': 'Change password', 'url': 'change-password', 'icon': 'fa-lock' },
      ]
    }
  ]

  quickLinks: any = [
    {
      "id": 0,
      "group": "Technology",
      "links": [
        { 'id': 1, 'name': 'Infosys', 'url': 'https://infosys.com', 'icon': 'fa-user', 'order': 0 },
        { 'id': 2, 'name': 'Apple', 'url': 'https://apple.com', 'icon': 'fa-user', 'order': 1 },
        { 'id': 3, 'name': 'Accenture', 'url': 'https://www.accenture.com', 'icon': 'fa-user', 'order': 2 },
      ]
    },
    {
      "id": 2,
      "group": "Sports",
      "links": [
        { 'id': 4, 'name': 'Cricbuzz', 'url': 'https://www.cricbuzz.com/', 'icon': 'fa-user', 'order': 0 },
        { 'id': 5, 'name': 'ESPN Cric Info', 'url': 'https://www.espncricinfo.com/', 'icon': 'fa-user', 'order': 1 }
      ]
    },
    {
      "id": 3,
      "group": "Politics",
      "links": [
        { 'id': 6, 'name': 'Times of India', 'url': 'https://timesofindia.indiatimes.com/', 'icon': 'fa-user', 'order': 0 },
        { 'id': 7, 'name': 'India Today', 'url': 'https://www.indiatoday.in/politics', 'icon': 'fa-user', 'order': 1 },
      ]
    }
  ]

  // quickLinks: any = {
  //   groups: [
  //     "Science",
  //     "Sports",
  //     "Politics"
  //   ],
  //   links: [
  //     { 'id': 0, 'name': 'Infosys', 'url': 'https://infosys.com', 'icon': 'fa-user', 'order': 0 },
  //     { 'id': 1, 'name': 'Apple', 'url': 'https://apple.com', 'icon': 'fa-user', 'order': 1 },
  //     { 'id': 2, 'name': 'Webelicious', 'url': 'https://webelicious.in', 'icon': 'fa-user', 'order': 2 },
  //   ]
  // }

  ngOnInit() {
    this.addQuickLinksForm = new FormGroup({
      group: new FormControl(''),
      newGroup: new FormControl(''),
      name: new FormControl(''),
      url: new FormControl(''),
      currentIndex: new FormControl(''),
    })
  }

  moreMenuToggleClicked(target) {
    console.log("more-menu-toggle");
    event.stopPropagation();
    $(".more-menu-dropdown").slideUp(0);
    $("#" + target).slideToggle(0);
    this.showAddQuickLinkFlag = false;
  }

  dropdownToggleClicked(target) {
    console.log("dropdownToggleClicked");
    $("#" + target).slideToggle("fast");
    this.showAddQuickLinkFlag = false;
  }

  sidebarClicked(event) {
    console.log("sidebarClicked");
    event.stopPropagation();
    $(".more-menu-dropdown").slideUp(0);
  }

  @HostListener('document:click', ['$event'])
  clickout(event) {
    console.log("document:clicked");
    this.toggleSideBar = false;
    $(".dropdown-list, .more-menu-dropdown").slideUp("fast");
    this.showAddQuickLinkFlag = false;
  }


  currentActiveTab(tab, parentTab, target) {
    // console.log(tab);
    // console.log(parentTab);
    if (target && target != '')
      $("#" + target).slideToggle("fast");

    this.showAddQuickLinkFlag = false;
    this.currentTab = tab;
    this.currentParentTab = parentTab;
    if (this.quickLinks)
      this.showAddQuickLinkFlag = false;

  }

  toggleAddQuickLink(flag, index) {
    this.showAddQuickLinkFlag = flag == 'toggle' ? !this.showAddQuickLinkFlag : flag;
    if (index != '') {
      this.addQuickLinksForm.controls.currentIndex.setValue(index)
    }
  }

  createQuickLink() {
    // console.log(this.addQuickLinksForm.value);
    this.addQuickLinksForm.markAllAsTouched();
    if (this.addQuickLinksForm.valid) {
      let currentIndex = this.addQuickLinksForm.get('currentIndex').value;
      console.log(this.addQuickLinksForm.get('currentIndex').value);
      if (currentIndex && currentIndex != '')
        this.quickLinks.splice(currentIndex, 0, this.addQuickLinksForm.value);
      else
        this.quickLinks.push(this.addQuickLinksForm.value);
      this.addQuickLinksForm.reset();
    }
  }

  reOrderQuickLinks(event, index, type) {
    event.stopPropagation();
    let obj = this.quickLinks[index];
    this.quickLinks.splice(index, 1);
    if (type == 'up') {
      let newIndex = index - 1;
      this.quickLinks.splice(newIndex, 0, obj);
    } else
      if (type == 'down') {
        let newIndex = index + 1;
        this.quickLinks.splice(newIndex, 0, obj);
      }
    $(".more-menu-dropdown").slideUp(0);
  }

  removeQuickLink(event, index) {
    event.stopPropagation();
    let confrm = confirm("Are you sure you want to remove?");
    if (confrm)
      this.quickLinks.splice(index, 1)
  }



}
