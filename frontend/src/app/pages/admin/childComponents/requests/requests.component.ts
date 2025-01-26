import { Component } from '@angular/core';
import { ContactService } from '../../../../services/contact.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-requests',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './requests.component.html',
  styleUrl: './requests.component.scss',
})
export class RequestsComponent {
  private contactService: ContactService;
  contacts$;
  selectedContact: any = null;
  unreadCount = 0;

  constructor(contactService: ContactService) {
    this.contactService = contactService;
    this.contacts$ = this.contactService.getContactRequests();
    this.loadUnreadCount();
  }

  loadUnreadCount() {
    this.contactService.getUnreadCount().subscribe((response) => {
      this.unreadCount = response.count;
    });
  }

  markAsRead(id: number) {
    this.contactService.markAsRead(id).subscribe(() => {
      this.contacts$ = this.contactService.getContactRequests();
      this.loadUnreadCount();
    });
  }

  viewDetails(contact: any) {
    this.selectedContact = contact;
    if (!contact.isRead) {
      this.markAsRead(contact.id);
    }
  }

  closeDetails() {
    this.selectedContact = null;
  }
}
