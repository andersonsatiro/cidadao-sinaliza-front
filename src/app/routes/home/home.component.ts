import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ChevronDown, Hand, LocateFixed, LucideAngularModule, Search, Settings, Sparkles } from 'lucide-angular';
import { GeolocationService } from '../../services/location/geolocation.service';
import { ToastMessageService } from '../../services/toast/toast-message.service';
import { find } from 'rxjs';

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
  readonly locateFixedIcon = LocateFixed;
  readonly handIcon = Hand;
  readonly sparklesIcon = Sparkles;

  openProfileMenu: boolean = false;
  openLocationModal: boolean = false;

  constructor(
    private geolocation: GeolocationService,
    private toastMessage: ToastMessageService
  ){}

  ngOnInit() {
    if (this.checkIsUserLogado()) {
      // Busca a localização do usuário
    } else {

      this.geolocation.getUserCoordinates().then(coordinates => {
        console.log('User coordinates:', coordinates);
        this.findLocationVisitante();
      }).catch(error => {
        this.openLocationModal = true;
      });

    }
  }

  getUserCoordinates() {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position)
    })
  }

  findLocationVisitante() {
    this.openLocationModal = false;     
    
    
    // Implementa a lógica para encontrar a localização do visitante
    this.geolocation.getUserLocation()
      .then(location => {
        console.log('User location:', location);
      })
      .catch(err => {
        console.error('Error getting user location:', err);
      });
  }

  checkIsUserLogado(): boolean {
    let token: string | null = localStorage.getItem('token')

    if(token === null || token.trim() === '') return false;
    return true;
  }

  closeLocationModal() {
    this.openLocationModal = false;
  }

  clickButton() {
    this.toastMessage.showSuccess('Botão clicado com sucesso! Agora você pode ver esta mensagem de sucesso. Alegria! 🎉');
  }
}
