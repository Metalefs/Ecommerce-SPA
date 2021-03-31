import { NgModule } from '@angular/core';
import { ServerModule, ServerTransferStateModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';

import { STORAGE_ENGINE } from '@ngxs/storage-plugin';
import { LocalStoragePolyfill } from '../local-storage.polyfill';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    ServerTransferStateModule
  ],
  providers:[
    // replaces NGXS storage engine on server
    { provide: STORAGE_ENGINE, useClass: LocalStoragePolyfill },
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
