import { Component, OnInit } from '@angular/core';
import { ToastMessageService, ToastType } from '../../services/toast/toast-message.service';
import { CommonModule } from '@angular/common';
import { Check, LucideAngularModule, Plus, Siren, X } from 'lucide-angular';

@Component({
  selector: 'app-toast',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
  standalone: true
})
export class ToastComponent implements OnInit {
  readonly CheckIcon = Check;
  readonly CloseIcon = X;
  readonly SirenIcon = Siren;
  readonly PlusIcon = Plus;
  show: boolean = false;
  message: string = '';
  type: ToastType = 'info';

  constructor(private toastService: ToastMessageService) {}

  ngOnInit(): void {
    this.toastService.toast$.subscribe(({ message, type }) => {
      this.message = message;
      this.type = type;
      this.show = true;

      setTimeout(() => (this.show = false), 50000);
    });
  }

  getMessageTitle(): string {
    if (this.type === 'success') return 'Tudo certo :)';
    if (this.type === 'error') return 'Algo deu errado :(';  
    if(this.type === 'warning') return 'Atenção!';
    return 'Novidade na área!';
  }

  getMessageIcon(): any {
    if (this.type === 'success') return this.CheckIcon;
    if (this.type === 'error') return this.CloseIcon;
    if (this.type === 'warning') return this.SirenIcon;
    return this.PlusIcon;
  }
}
