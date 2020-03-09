import { ContextOf } from './context-of';
import { PageContext } from './page-context/page-context';

export class ContextOfPage extends ContextOf {
  page: PageContext; // this will be information related to the current page
}
