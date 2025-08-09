import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './routes/home/home.component';
import { ToastComponent } from "./components/toast/toast.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HomeComponent, ToastComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Cidadão Sinaliza';
}
