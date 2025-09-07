import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ChevronDown, Hand, LocateFixed, LucideAngularModule, Search, Settings, Sparkles } from 'lucide-angular';
import { GeolocationService } from '../../services/location/geolocation.service';
import { ToastMessageService } from '../../services/toast/toast-message.service';
import { checkUserStatus } from '../../utils/auth.utils';
import { State } from '../../models/state.model';
import { City } from '../../models/city.model';

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
  openStateList: boolean = false;
  openCityList: boolean = false;
  openLocationModal: boolean = false;

  stateList: State[] = [];
  cityList: City[] = [];

  constructor(
    private geolocation: GeolocationService,
    private toastMessage: ToastMessageService
  ){}

  ngOnInit() {
    this.handleUserLocationFlow();
    this.findStatesFromBrazil();
  }

  async handleUserLocationFlow() {
    if (checkUserStatus()) {
      // this.displayUserLocation();
      return;
    }

    if (await this.geolocation.userPermittedLocationAccess()) {
      try {
        const coordinates = await this.geolocation.getUserLocation();
        
        if(coordinates.latitude && coordinates.longitude) {
          //const address = await this.geolocation.getAddressFromCoords(coordinates.latitude, coordinates.longitude);
          //console.log('User address:', address);
        }
      } catch (error) {
        this.toastMessage.showError('Não foi possível obter sua localização. Por favor, encontre sua cidade manualmente.');
      }  
    } else {
      this.openLocationModal = false; //alterar
    }
  }

  findStatesFromBrazil() {
    this.geolocation.getStatesFromBrazil().subscribe({
      next: (data) => {
        this.stateList = data;
        console.log(this.stateList);
      },
      error: (err) => {
        this.toastMessage.showError('Não foi possível carregar a lista de estados. Tente novamente mais tarde.');
      }
    })
  }

  closeLocationModal() { this.openLocationModal = false; }

  toggleStateList() {
    this.openStateList = !this.openStateList;
    this.openCityList = false;
  }

  toggleCityList() {
    this.openCityList = !this.openCityList;
    this.openStateList = false;
  }
}
