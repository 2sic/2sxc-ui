export class ContentType {
    IsHidden: boolean;
    Name: string;
    StaticName: string;
    Label: string;
    Thumbnail: string;
    Properties?: ContentTypeProperties;

    // /**
    //  * This property is added by the UI, and does not come from the REST call
    //  * 2022-11-04 2dm - doesn't seem to be added in the UI either, so skip / remove this ???
    //  * 2022-11-04 2dm disabled, think it's never used
    //  */
    TemplateId: number;
    IsDefault = false;
}

class ContentTypeProperties {
    Description: string;
    EditInstructions: string;
    Icon: string;
    Id: number;
    Label: string;
    Link: string;
    Notes: string;
    Title: string;
}
