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

  }

  moreMenuToggleClicked(target){
    console.log("more-menu-toggle");
    event.stopPropagation();
    $(".more-menu-dropdown").slideUp(0);
    $("#"+target).slideToggle(0);
    this.showAddQuickLinkFlag = false;
  }

  dropdownToggleClicked(target){
    console.log("dropdownToggleClicked");
    $("#"+target).slideToggle("fast");
    this.showAddQuickLinkFlag = false;
  }

  sidebarClicked(event){
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
    $("#"+target).slideToggle("fast");
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
