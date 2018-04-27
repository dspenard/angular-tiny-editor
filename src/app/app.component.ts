import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TinyEditorConfig } from './tiny-editor/tiny-editor-config';
import * as $ from 'jquery';

window['$'] = $;
window['jQuery'] = $;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  formGroup: FormGroup;
  baseballData: string;
  tinyEditorConfig: TinyEditorConfig;

  constructor(private formBuilder: FormBuilder) {
    this.formGroup = formBuilder.group({
      'baseballData': [this.baseballData, Validators.required]
      // use this for no validation
      //'baseballData': [null]
    });
  }

  ngOnInit() {

    // just some data to demonstrate the inputs menu, with autocompletion
    // using the tiny-mce mentions plugin
    const baseballTeams: any =
    [
      {name: 'Orioles'},
      {name: 'Red Sox'},
      {name: 'Yankees'},
      {name: 'Blue Jays'},
      {name: 'Rays'}
    ];

    // if you do not pass tinyEditorConfig via the [config]
    // property for app-tiny-config, it will use the defaults,
    // which exclude the inputs menu and autocompletion
    this.tinyEditorConfig = new TinyEditorConfig();
    this.tinyEditorConfig.includeInputsMenu = true;
    this.tinyEditorConfig.inputsMenuList = baseballTeams;
    this.tinyEditorConfig.includeMentionsAutoComplete = true;
  }

  showHtml() {
    console.log(this.baseballData);
  }
}
