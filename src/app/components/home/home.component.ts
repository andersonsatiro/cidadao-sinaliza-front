import { Component } from '@angular/core';
import { ChevronDown, LucideAngularModule, Search } from 'lucide-angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [LucideAngularModule],
})
export class HomeComponent {
  readonly searchIcon = Search;
  readonly chevronDownIcon = ChevronDown
}
