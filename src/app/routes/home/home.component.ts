import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ChevronDown, LucideAngularModule, Search, Settings } from 'lucide-angular';
import { GeolocationService } from '../../services/location/geolocation.service';
import { ToastMessageService } from '../../services/toast/toast-message.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [LucideAngularModule, CommonModule],
})
export class HomeComponent {
  readonly searchIcon = Search;
  readonly chevronDownIcon = ChevronDown;
  readonly settingsIcon = Settings;

  openProfileMenu: boolean = false;

  constructor(
    private geolocation: GeolocationService,
    private toastMessage: ToastMessageService
  ){}

  ngOnInit() {
    this.checkUserType();

    this.geolocation.getUserLocation()
      .then(location => {
        console.log('User location:', location);
      })
      .catch(err => {
        console.error('Error getting user location:', err);
      });
  }

  checkUserType() {
    let token: string | null = localStorage.getItem('token')

    if(token === null || token.trim() === '') {
      this.toastMessage.showError('Usuário não autenticado. Por favor, faça login.');
    }
  }

  clickButton() {
    alert('Botão clicado!');
    this.toastMessage.showSuccess('Botão clicado com sucesso!');
  }
}
