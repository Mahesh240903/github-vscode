import { Component, OnInit } from '@angular/core';
import { Contact } from './models/contact';
import { PhonebookService } from './phonebook.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  contacts! : Contact[];
  addForm!: FormGroup;
  searchForm!: FormGroup;
  newContact!: Contact;
  isSubmitted! :boolean;

  constructor(private fb: FormBuilder, private service: PhonebookService) { }

  ngOnInit(): void {
    this.isSubmitted = false;

    //loading contact
    this.contacts = this.service.contacts;

    //Form to add Contacts
    this.addForm = new FormGroup({
      firstName: new FormControl('',Validators.required),
      lastName: new FormControl(''),
      number: new FormControl('',[Validators.required,Validators.minLength(10),Validators.maxLength(10)])
    })
    this.addForm.disable();

    //Form for search-bar
    this.searchForm = new FormGroup({
      searchBar: new FormControl(''),
    })
    
  }



  displayAddContactForm(){
    this.newContact = {} as Contact;
    this.addForm.reset();
    this.addForm.enable();
  }
  exit(){
    this.addForm.disable();
  }
  
  
  addContact(){
    this.isSubmitted = true;
    Object.assign(this.newContact,this.addForm.value)
    this.service.addContact(this.newContact)
    this.ngOnInit();
  }

  deleteContact(idx: number){
    this.service.delete(idx);
    this.search();
  }

  get firstName(){
    return this.addForm.controls['firstName'];
  }

  get number(){
    return this.addForm.controls['number'];
  }

  get searchBar(){
    return this.searchForm.controls['searchBar']
  }

  search(){
    // console.log(this.searchBar.value);
    this.contacts = this.service.search(this.searchBar.value)
  }
}