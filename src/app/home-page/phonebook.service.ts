import { Injectable } from "@angular/core";
import { Contact } from "./models/contact"
import { FormControl } from "@angular/forms";


@Injectable({
    providedIn: 'root'
  })
export class PhonebookService{
    contacts: Contact[] = [
        new Contact("Ram","Charan",1234567890),
            new Contact("Mahesh","Charan",1234567890),
            new Contact("Sam","Charan",1234567890),
            new Contact("Ram","Charan",1234567890),
            new Contact("Ram","Charan",1234567890),
    ]

    addContact(newContact: Contact){
        console.log(newContact);
        this.contacts.push(newContact)
    }

    delete(idx: number){
        this.contacts.splice(idx,1)
    }

    search(searchBar: string){
        return this.contacts.filter(contact => (contact.firstName.concat(" ",contact.lastName)).toLowerCase().includes(searchBar.toLowerCase()));
    }
}