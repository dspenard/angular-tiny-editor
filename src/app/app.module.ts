import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { TinyEditorComponent } from './tiny-editor/tiny-editor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SafeHtmlPipePipe } from './pipes/safe-html.pipe';

@NgModule({
  declarations: [
    AppComponent,
    TinyEditorComponent,
    SafeHtmlPipePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    TinyEditorComponent,
    SafeHtmlPipePipe
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
