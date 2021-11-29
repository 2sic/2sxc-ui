export class ContentType {
    IsHidden: boolean;
    Name: string;
    StaticName: string;
    Label: string;
    Thumbnail: string;
    Properties?: ContentTypeProperties;

    /**
     * This property is added by the UI, and does not come from the REST call
     */
    TemplateId: number;
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
