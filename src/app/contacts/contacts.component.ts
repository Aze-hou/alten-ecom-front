import { Component, inject } from "@angular/core";
import { RouterLink } from "@angular/router";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { ContactsFormComponent } from "./contacts-form/contacts-form.component";

@Component({
  selector: "app-contacts",
  templateUrl: "./contacts.component.html",
  styleUrls: ["./contacts.component.scss"],
  standalone: true,
  imports: [CardModule, RouterLink, ButtonModule, ContactsFormComponent],
})
export class ContactsComponent {
  public readonly appTitle = "CONTACTS";


}
