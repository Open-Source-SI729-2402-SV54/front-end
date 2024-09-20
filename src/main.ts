import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from '../../../OPEN GIT/src/app/app.component';
import { appConfig } from '../../../OPEN GIT/src/app/app.config';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
