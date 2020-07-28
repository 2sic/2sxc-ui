/*
  Note: these DTO objects have two issues we must solve some time
  1. They are also used in the main eav-admin dialog, so the type should be shared
  1. It's still missing some objects not needed in the quick-dialog
*/

import { Dictionary } from '../../../../sxc-typings';

// missing ATM
// UserDto
// EnableDto

export class ContextDto {
  App?: AppDto;
  Language: LanguageDto;
  System?: WebResourceDto;
  Site?: WebResourceDto;
  Page?: WebResourceDto;
}

class WebResourceDto {
  Id?: number;
  Url?: string;
}

class AppDto extends WebResourceDto {
  Name: string;
  Identifier: string;
  GettingStartedUrl: string;
}

class LanguageDto {
  Primary: string;
  Current: string;
  All: Dictionary<string>;
}
