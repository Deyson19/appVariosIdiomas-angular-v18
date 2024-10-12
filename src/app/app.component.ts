import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
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
export class AppComponent implements OnInit, OnDestroy, OnChanges {
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
  ngOnChanges(changes: SimpleChanges): void {
    effect(() => {
      console.log('Cambios:', changes);
      console.log('Usando effect');
    });
    console.log('Algo cambió en el componente.');
  }
  ngOnDestroy(): void {
    localStorage.setItem('language', this.currentLang);
  }
  ngOnInit(): void {
    this.currentLang = this.checkCurrentLang() || 'es';
    this.translate.use(this.currentLang);
  }

  changeLang(lang: string): void {
    const myLang = this.checkCurrentLang();
    if (myLang !== lang) {
      this.currentLang = lang;
      localStorage.setItem('language', lang);
      this.translate.use(lang);
    }
  }
  checkCurrentLang() {
    return localStorage.getItem('language');
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
