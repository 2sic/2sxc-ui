import { Pipe, PipeTransform } from "@angular/core";
import { cViewWithoutContent } from "./constants";
import { Template } from "./template";
import { ContentType } from "./content-type";

@Pipe({
  name: "templateFilter",
  standalone: true,
})
export class TemplateFilterPipe implements PipeTransform {
  transform(
    templates: Template[],
    args: { isContent: boolean; contentType: ContentType }
  ): Template[] {
    const typeId = args.contentType ? args.contentType.StaticName : undefined;

    // in case we're filtering for the special "empty" code, use empty in the filter
    const typeNameFilter = typeId === cViewWithoutContent ? "" : typeId || "";

    return templates
      .filter((t) => !t.IsHidden)
      .filter(
        (t) => !args.isContent || t.ContentTypeStaticName === typeNameFilter
      );
  }
}
