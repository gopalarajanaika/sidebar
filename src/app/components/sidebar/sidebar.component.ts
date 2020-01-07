import { Component, OnInit } from '@angular/core';
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
    { 'name': 'Messages', 'url': '/', 'icon': 'fa-dashboard' },
    {
      'name': 'About Us', 'url': 'about-us', 'icon': 'fa-university', 'subMenus': [
        { 'name': 'Mission', 'url': 'mission', 'icon': 'fa-user' },
        { 'name': 'vision', 'url': 'vision', 'icon': 'fa-user' },
      ]
    },
    { 'name': 'Admissions', 'url': 'admissions', 'icon': 'fa-plus' },
    { 'name': 'Announcements', 'url': 'announcements', 'icon': 'fa-bell' },
    { 'name': 'Clubs', 'url': 'clubs', 'icon': 'fa-users' },
    {
      'name': 'Settings', 'url': 'settings', 'icon': 'fa-gear', 'subMenus': [
        { 'name': 'Profile', 'url': 'profile', 'icon': 'fa-user' },
        { 'name': 'Change password', 'url': 'change-password', 'icon': 'fa-lock' },
      ]
    }
  ]

  quickLinks: any = [
    { 'id': 0, 'name': 'Infosys', 'url': 'https://infosys.com', 'icon': 'fa-user', 'order': 0 },
    { 'id': 1, 'name': 'Apple', 'url': 'https://apple.com', 'icon': 'fa-user', 'order': 1 },
    { 'id': 2, 'name': 'Webelicious', 'url': 'https://webelicious.in', 'icon': 'fa-user', 'order': 2 },
  ]

  ngOnInit() {
    let self = this;
    this.addQuickLinksForm = new FormGroup({
      name: new FormControl(''),
      url: new FormControl(''),
      currentIndex: new FormControl(''),
    })

    $('html, body').on('click', '.more-menu-toggle', function (e) {
      e.stopPropagation();
      let target = $(this).attr("data-target");
      $(".more-menu-dropdown").slideUp(0);
      $(target).slideToggle(0);
      self.showAddQuickLinkFlag = false;
    });


    $('html, body').on('click', '.dropdown-toggle', function (e) {
      let target = $(this).attr("data-target");
      $(target).slideToggle("fast");
      self.showAddQuickLinkFlag = false;
    });
    $('html, body').on('click', '#sidebar', function (e) {
      e.stopPropagation();
      $(".more-menu-dropdown").slideUp(0);
    });

    $('html, body').on('click', function (e) {
      $('#sidebar').removeClass('mr-0');
      $(".dropdown-list, .more-menu-dropdown").slideUp("fast");
      self.showAddQuickLinkFlag = false;
    });

    $('html, body').on("click", '#sidebarClose', function (e) {
      e.stopPropagation();
      $('#sidebar').removeClass('mr-0');
    });

    $('html, body').on("click", '#sidebarOpen', function (e) {
      // e.stopPropagation();
      $('#sidebar').addClass('mr-0');
    });

  }

  currentActiveTab(tab, parentTab) {
    console.log(tab);
    console.log(parentTab);
    this.currentTab = tab;
    this.currentParentTab = parentTab;
    if (this.quickLinks)
      this.showAddQuickLinkFlag = false;
  }

  toggleAddQuickLink(flag, index) {
    this.showAddQuickLinkFlag = flag;
    if (index != '') {
      this.addQuickLinksForm.controls.currentIndex.setValue(index)
    }
  }

  createQuickLink() {
    console.log(this.addQuickLinksForm.value);

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

  reOrderQuickLinks(event, index, type){
    event.stopPropagation();
    let obj = this.quickLinks[index];
    this.quickLinks.splice(index, 1);
    if(type == 'up'){
      let newIndex = index - 1;
      this.quickLinks.splice(newIndex, 0, obj);
    }else
    if(type == 'down'){
      let newIndex = index + 1;
      this.quickLinks.splice(newIndex, 0, obj);
    }
    $(".more-menu-dropdown").slideUp(0);
  }

  removeQuickLink(event, index){
    event.stopPropagation();
    this.quickLinks.splice(index, 1)
  }



}
