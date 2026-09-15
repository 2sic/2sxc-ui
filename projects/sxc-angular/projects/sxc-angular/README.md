<img src="https://raw.githubusercontent.com/2sic/2sxc-ui/develop/projects/sxc-angular/assets/logo-dark.png" width="300px" align="right">

# sxc-angular

Connect Angular 18+ applications to 2sxc on DNN or Oqtane.

The package configures Angular's `HttpClient` with the 2sxc context and request headers, exposes simple data/query/API clients, prevents accidental ASP.NET form submission, and provides standalone editing-toolbar directives.

## Install

```bash
npm install @2sic.com/sxc-angular
```

## Configure

First, register all sxc-angular providers in the application configuration:

```ts
import { ApplicationConfig } from '@angular/core';
import { provideSxc } from '@2sic.com/sxc-angular';

export const appConfig: ApplicationConfig = {
  providers: [
    provideSxc(),
  ],
};
```

Then inject the initializer and root element into the root component:

```ts
import { Component, ElementRef } from '@angular/core';
import { SxcInitializer } from '@2sic.com/sxc-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  constructor(element: ElementRef, sxc: SxcInitializer) {
    sxc.initialize(element);
  }
}
```

Both steps are required:

- `provideSxc()` registers `Context`, `SxcApp`, `SxcInitializer`, Angular's `HttpClient`, and the 2sxc interceptor.
- `sxc.initialize(element)` reads the context from the root component before its lifecycle hooks run.

No Angular modules or base component are required.

Optional context overrides and form submission behavior belong on the initialization call:

```ts
constructor(element: ElementRef, sxc: SxcInitializer) {
  sxc.initialize(element, {
    context: {
      moduleId: 42,
      apiEdition: 'live',
    },
    enableDefaultSubmit: true,
  });
}
```

Values such as `edition`, `api-edition`, and `angular-path` can still be placed on the Angular root element and are detected automatically.

## Use 2sxc data, queries, and APIs

Inject `SxcApp` wherever it is needed:

```ts
import { Component, inject } from '@angular/core';
import { SxcApp } from '@2sic.com/sxc-angular';

@Component({
  selector: 'app-example',
  standalone: true,
  template: '',
})
export class ExampleComponent {
  private readonly sxc = inject(SxcApp);

  items$ = this.sxc.data<MyItem>('MyContentType').getAll();
  result$ = this.sxc.query<MyResult>('MyQuery').getAll();

  loadFromApi() {
    return this.sxc.api('MyController').get<MyResult>('MyMethod', {});
  }
}
```

The returned values are RxJS observables supplied by Angular's HTTP client.

## Editing toolbars

Both toolbar directives are standalone. Import only the one used by a component:

```ts
import { Component } from '@angular/core';
import { SxcTagToolbarDirective } from '@2sic.com/sxc-angular';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [SxcTagToolbarDirective],
  template: `<article [sxc-toolbar]="toolbar">...</article>`,
})
export class ItemComponent {
  toolbar = {};
}
```

The element form is available as `SxcToolbarDirective`.

## More information

See the [2sxc Angular documentation](https://docs.2sxc.org/js-code/angular/index.html) and the [npm package](https://www.npmjs.com/package/@2sic.com/sxc-angular).
