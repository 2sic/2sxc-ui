import { ContentBlock } from './content-block';
import { ContentGroup } from './content-group';
import { Environment } from './environment';
import { Error } from './error';
import { Language } from './language';
import { Ui } from './ui';
import { User } from './user';

export class DataEditContext {
  // ReSharper disable InconsistentNaming
  Environment: Environment;
  User: User;
  Language: Language;
  ContentBlock: ContentBlock;
  ContentGroup: ContentGroup;
  error: Error;
  Ui: Ui;
  // ReSharper restore InconsistentNaming
}
