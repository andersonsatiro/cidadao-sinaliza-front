import { Component, OnInit } from '@angular/core';
import { ToastMessageService, ToastType } from '../../services/toast/toast-message.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toast',
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
  standalone: true
})
export class ToastComponent implements OnInit {
  show: boolean = false;
  message: string = '';
  type: ToastType = 'info';

  constructor(private toastService: ToastMessageService) {}

  ngOnInit(): void {
    this.toastService.toast$.subscribe(({ message, type }) => {
      this.message = message;
      this.type = type;
      this.show = true;

      setTimeout(() => (this.show = false), 5000);
    });
  }
}
