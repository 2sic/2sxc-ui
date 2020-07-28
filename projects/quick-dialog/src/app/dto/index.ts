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
