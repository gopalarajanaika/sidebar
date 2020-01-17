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

  ngOnInit() {
    this.addQuickLinksForm = new FormGroup({
      group: new FormControl(''),
      newGroup: new FormControl(''),
      name: new FormControl(''),
      url: new FormControl(''),
      childIndex: new FormControl(''),
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
    if (target && target != '')
      $("#" + target).slideToggle("fast");

    this.showAddQuickLinkFlag = false;
    this.currentTab = tab;
    this.currentParentTab = parentTab;
    if (this.quickLinks)
      this.showAddQuickLinkFlag = false;

  }

  toggleAddQuickLink(flag, parentIndex, childIndex) {
    this.showAddQuickLinkFlag = flag == 'toggle' ? !this.showAddQuickLinkFlag : flag;
    this.addQuickLinksForm.controls.childIndex.setValue(childIndex);
    this.addQuickLinksForm.controls.group.setValue(parentIndex);
  }

  createQuickLink() {
    this.addQuickLinksForm.markAllAsTouched();
    if (this.addQuickLinksForm.valid) {
      let name = this.addQuickLinksForm.get('name').value;
      let newGroup = this.addQuickLinksForm.get('newGroup').value;
      let url = this.addQuickLinksForm.get('url').value;
      let childIndex = this.addQuickLinksForm.get('childIndex').value;
      let group = this.addQuickLinksForm.get('group').value;
      if (group != -1) {
        if (childIndex == 0 || childIndex != '')
          this.quickLinks[group].links.splice(childIndex+1, 0, this.addQuickLinksForm.value);
        else
          this.quickLinks[group].links.push(this.addQuickLinksForm.value);
      } else {
        let obj = {
          "id": 4,
          "group": newGroup,
          "links": [
            { 'id': 4, 'name': name, 'url': url, 'icon': 'fa-user', 'order': 0 }
          ]
        }
        this.quickLinks.push(obj);
      }

      this.addQuickLinksForm.reset({ 'group': '', 'newGroup':'', 'name':'', 'url':'', 'childIndex':''});
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