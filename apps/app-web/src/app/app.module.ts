import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireStorage, AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireModule } from '@angular/fire';

import { CKEditorModule } from 'ckeditor4-angular';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor, ErrorInterceptor } from './core/interceptor';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';

import { RouteReuseStrategy } from '@angular/router';
import { RouteReuseService } from './core/service/RouteReuseService';

import { NgxsModule } from '@ngxs/store';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';

import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';

import { CookieLawModule } from 'angular2-cookie-law';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { States } from './data/store/state';
import { CEPService, EmailNotificacaoService, EstadoService, ImagemService, ItemCarouselService, OrcamentoService, ProdutoService, Services, SobreService } from './data/service';
import { MediaMatcher } from '@angular/cdk/layout';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { NgDialogAnimationService } from "ng-dialog-animation";
import { NgxSpinnerModule } from "ngx-spinner";
@NgModule({
  declarations: [AppComponent],
  imports:
  [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    SharedModule,
    HttpClientModule,
    CKEditorModule,
    AngularFireStorageModule,
    HammerModule,
    CookieLawModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyCYzAtXmRwAvgeqvVn1J8SNC0TOEM6Jbq4",
      authDomain: "personalizados-lopes-web-app.firebaseapp.com",
      databaseURL: "https://personalizados-lopes-web-app.firebaseio.com",
      projectId: "personalizados-lopes-web-app",
      storageBucket: "personalizados-lopes-web-app.appspot.com",
      messagingSenderId: "38712629948",
      appId: "1:38712629948:web:2ac14da01082ccff1c0eb9",
      measurementId: "G-DJB9B89GXD"
    }),
    AppRoutingModule,
    NgxSpinnerModule,
    NgxsModule.forRoot(States),
    NgxsStoragePluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot({
      disabled:environment.production
    }),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    NgDialogAnimationService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: Document },
    { provide: AngularFireStorage },
    { provide: ProdutoService },
    { provide: SobreService },
    { provide: OrcamentoService },
    { provide: EmailNotificacaoService },
    { provide: ItemCarouselService },
    { provide: ImagemService },
    { provide: CEPService },
    { provide: EstadoService },
    { provide: ErrorHandler },
    { provide: MediaMatcher },
    {
      provide: RouteReuseStrategy,
      useClass: RouteReuseService
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
