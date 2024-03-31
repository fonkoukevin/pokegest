import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/pokemon/app.component';
import { config } from './app/pokemon/app.config.server';

const bootstrap = () => bootstrapApplication(AppComponent, config);

export default bootstrap;
