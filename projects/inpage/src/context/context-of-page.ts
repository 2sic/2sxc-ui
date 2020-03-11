import { ContextOf } from './context-of';
import { ContextOfPage } from './page-context/page-context';

export class ContextBundleOfPage extends ContextOf {
  page: ContextOfPage; // this will be information related to the current page
}
