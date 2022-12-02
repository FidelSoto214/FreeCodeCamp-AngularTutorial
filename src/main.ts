/**
 * NOTES:
 * main.ts is the entry point of the logic code.
 * In terms of loading in a browser, the index.html file gets loaded first,
 * followed by the main.ts file.
 */
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

// This right here is the entry point for the application.
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
