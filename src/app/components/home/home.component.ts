import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ChevronDown, LucideAngularModule, Search, Settings } from 'lucide-angular';

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
}
