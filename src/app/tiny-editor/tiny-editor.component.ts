import { Component, OnInit, AfterViewInit, Input, Output, EventEmitter, OnDestroy, forwardRef } from '@angular/core';
import { FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TinyEditorConfig } from './tiny-editor-config';
import { isNullOrUndefined, isNull, isUndefined } from 'util';
import 'tinymce';
import 'tinymce/themes/modern';
import 'tinymce/plugins/table';
import 'tinymce/plugins/link';
import 'tinymce/plugins/lists';

declare var tinymce: any;

@Component({
  selector: 'app-tiny-editor',
  templateUrl: './tiny-editor.component.html',
  styleUrls: ['./tiny-editor.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TinyEditorComponent),
      multi: true
    }
  ]
})
export class TinyEditorComponent implements OnInit, OnDestroy, AfterViewInit, ControlValueAccessor {

  @Input() elementId: string;
  @Input() formControl: FormControl;
  @Input('value') _value: string;
  @Input() config?: TinyEditorConfig;

  editor: any;
  inputItems: any;
  accountItems: any;

  onChange: any = () => { };
  onTouched: any = () => { };

  constructor() { }

  ngOnInit() {
    if (isNullOrUndefined(this.config)) {
      this.config = new TinyEditorConfig();
    }
  }

  ngOnDestroy() {
    tinymce.remove(this.editor);
  }

  ngAfterViewInit() {
    tinymce.init({
      selector: '#' + this.elementId,
      theme_url: '/assets/tinymce/themes/modern/theme.min.js',
      skin_url: '/assets/tinymce/skins/lightgray',
      max_height: this.config.maxHeight,

      // TODO: one enhancement I want to make is to have the menu and toolbar settings
      // completely dynamic and modify the TinyEditorConfig object and the
      // corresponding code here, as needed.

      // menu: {},
      menu: {
        file: {title: 'File', items: 'newdocument'},
        edit: {title: 'Edit', items: 'undo redo | cut copy paste pastetext | selectall'},
        insert: {title: 'Insert', items: 'link media | template hr'},
        view: {title: 'View', items: 'visualaid'},
        format: {title: 'Format', items: 'bold italic underline strikethrough superscript subscript | formats | removeformat'},
        table: {title: 'Table', items: 'inserttable tableprops deletetable | cell row column'},
        tools: {title: 'Tools', items: 'spellchecker code'}
      },
      plugins: ['table', 'lists', 'link'],

      // inputs is the custom menu item added below in the editor setup
      toolbar: 'undo redo | bold italic underline | bullist numlist | link table inputs',

      browser_spellcheck: this.config.spellCheck,
      statusbar: this.config.showStatusBar,
      resize: this.config.allowResize,

      init_instance_callback: this.init_instance_callback,

      setup: editor => {
        this.editor = editor;

        editor.on('keyup change blur', () => {
          const content = editor.getContent();
          this.onEditorContentChange(content);
        });

        if (this.config.useInputsMenuList) {
          editor.addButton('inputs', {
            type: 'menubutton',
            text: '@input',
            icon: false,
            menu: this.config.inputsMenuList.map(c => {
              return {
                text: c.name,
                value: `${c.name} `,
                onclick: function () {
                  editor.insertContent(this.value());
                }
              };
            }),
          });
        }

        if (this.config.useMentionsAutoComplete) {
          const allMenuItems = this.config.inputsMenuList;
          editor.settings.external_plugins = {
            'mention': '/assets/tinymce/plugins/mention/plugin.js'
          };
          editor.settings.plugins.concat(' mention');
          editor.settings.mentions = {
            delimiter: '@',
            delay: 0,
            items: 50,
            insert: function (item) {
              return item.name;
            },
            source: function (query, success) {
              success(allMenuItems);
            },
            renderDropdown: function () {
              if (this.editor.getElement().parentNode.className.indexOf('tiny-editor-mentions') > -1) {
                return '<ul class="rte-autocomplete dropdown-menu"></ul>';
              }
            }
          };
        }
      }
    });
  }

  /**
   * Callback method called after the editor has been initialized.
   * Needed to remove the status bar text shown by default.
   *
   * @param mce - the editor instance object reference
   */
  init_instance_callback(mce: any) {
    const divEl = mce.getContainer().getElementsByClassName('mce-branding mce-widget mce-label mce-flow-layout-item mce-last');
    if (!isNullOrUndefined(divEl) && divEl.length === 1) {
      divEl[0].style.display = 'none';
    }
    const spanEl = mce.getContainer().getElementsByClassName('mce-path mce-flow-layout-item mce-first');
    if (!isNullOrUndefined(spanEl) && spanEl.length === 1) {
      spanEl[0].style.display = 'none';
    }
  }

  onEditorContentChange(event: string) {
    this.setValue(event);
    this.onChange(event);
    this.onTouched();
  }

  get value() {
    return this._value;
  }

  set value(val) {
    this.setValue(val);
  }

  setValue(val) {
    // textarea needs value set to null to show ''; 'undefined' will show if value is undefined
    if (isUndefined(val)) {
      this._value = null;
    } else {
      this._value = val;
    }
  }

  writeValue(val) {
    this.value = val;
  }

  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched(fn) {
    this.onTouched = fn;
  }
}
