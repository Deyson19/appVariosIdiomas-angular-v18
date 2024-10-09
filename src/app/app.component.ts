import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TranslateModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  private readonly translate = inject(TranslateService);
  private currentLang: string = 'es';
  constructor() {
    const location = navigator;
    if (location.language) {
      console.log(`Idioma del usuario: ${location.language}`);

      this.currentLang = location.language.toString().startsWith('en')
        ? 'en'
        : 'es';
    }
  }
  ngOnInit(): void {
    this.translate.use(this.currentLang);
  }

  changeLang(lang: string): void {
    this.translate.use(lang);
  }
  idiomas: MyLanguages[] = [
    { alias: 'es', name: 'Español' },
    { alias: 'en', name: 'English' },
    { alias: 'fr', name: 'Français' },
    { alias: 'de', name: 'Alemán' },
    { alias: 'pt', name: 'Portugués' },
  ];
}
interface MyLanguages {
  alias: string;
  name: string;
}
