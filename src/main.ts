import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/pokemon/app.config';
import { AppComponent } from './app/pokemon/app.component';


bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

