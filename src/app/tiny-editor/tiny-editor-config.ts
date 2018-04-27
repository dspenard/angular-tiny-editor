import { Injectable } from '@angular/core';
import { isNullOrUndefined, isNull, isUndefined } from 'util';

export class TinyEditorConfig {
  inputsMenuList: any[];
  includeInputsMenu = false;
  includeMentionsAutoComplete = false;
  maxHeight = 600;
  spellCheck = true;
  showStatusBar = true;
  allowResize = true;

  get useInputsMenuList(): boolean {
    return this.includeInputsMenu &&
      !isNullOrUndefined(this.inputsMenuList) &&
      this.inputsMenuList.length > 0;
  }

  get useMentionsAutoComplete(): boolean {
    return this.includeMentionsAutoComplete && this.useInputsMenuList;
  }
}
