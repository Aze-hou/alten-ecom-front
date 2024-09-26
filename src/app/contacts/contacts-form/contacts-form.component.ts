import { HttpClient, HttpClientModule, provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import {
  Component,
  computed,
  EventEmitter,
  inject,
  input,
  Output,
  ViewEncapsulation,
} from "@angular/core";
import { FormsModule, NgForm } from "@angular/forms";
import { Contact } from "app/products/data-access/contact.model";
import { Product } from "app/products/data-access/product.model";
import { environment } from "environments/environment";
import { MessageService, SelectItem } from "primeng/api";
import { ButtonModule } from "primeng/button";
import { DropdownModule } from "primeng/dropdown";
import { InputNumberModule } from "primeng/inputnumber";
import { InputTextModule } from "primeng/inputtext";
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MessagesModule } from 'primeng/messages';
import { catchError, of, tap } from "rxjs";

@Component({
  selector: "app-contacts-form",
  template: `
     <p-messages />
    <form #form="ngForm" (ngSubmit)="onSave(form)">
      <div class="form-field">
        <label for="name">Email</label>
        <input pInputText
          type="email"
          id="email"
          [email]="true"
          name="email"
          [(ngModel)]="editedContact().email"
          required>
      </div>
     
      <div class="form-field">
        <label for="message">Message</label>
        <textarea pInputTextarea 
          id="message"
          name="message"
          rows="5"
          maxlength="300" 
          cols="30" 
          [(ngModel)]="editedContact().message">
        </textarea>
      </div>      
    
      <div class="flex justify-content-between">
        <p-button type="submit" [disabled]="!form.valid" label="Envoyer" severity="success"/>
      </div>
    </form>
  `,
  styleUrls: ["./contacts-form.component.scss"],
  standalone: true,
 
  imports: [
    FormsModule,
    InputTextModule,
    HttpClientModule,
    ButtonModule,
    InputNumberModule,
    InputTextareaModule,
    MessagesModule,
    DropdownModule,
  ],
  encapsulation: ViewEncapsulation.None
})
export class ContactsFormComponent {
  
  private readonly http = inject(HttpClient);

  constructor(private messageService: MessageService) {}
  public readonly contact = input<Contact>();

  @Output() cancel = new EventEmitter<void>();
  @Output() save = new EventEmitter<Contact>();

  private readonly path = `${environment.backend}/api/contacts`;


  public readonly editedContact = computed(() => ({ ...this.contact() }));

  onSave(form: NgForm) {
    // should send mail from server
    console.log(form.value) 
    this.http.post<any>(this.path, form.value).pipe(
      catchError(() => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error  envoi',
            detail: 'Error lors de envoi'
          });  
          return of(true);
      }),
      tap(() => {
        form.reset();
        this.messageService.add({
          severity: 'success',
          summary: 'Formulaire envoyé',
          detail: 'Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais.'
        });  
      }),
  );
    
  }
}
