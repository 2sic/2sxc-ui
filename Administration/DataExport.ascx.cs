﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using ToSic.Eav;
using ToSic.SexyContent;
using ToSic.SexyContent.DataImportExport;

namespace ToSic.SexyContent.Administration
{
    public partial class DataExport : DotNetNuke.Entities.Modules.PortalModuleBase
    {
        // NOTE2tk: Find the dialog on http://2sexycontent.2tk.2sic/Home/tabid/55/ctl/dataexport/mid/388/Default.aspx?popUp=true
        public int? ApplicationId
        {
            get
            {
                if (ViewState["ApplicationId"] == null)
                {
                    return new int?();
                }
                return (int?)ViewState["ApplicationId"];
            }
            set
            {
                ViewState["ApplicationId"] = value;
            }
        }

        public List<string> Languages
        {
            get
            {
                if (ViewState["Languages"] == null)
                {
                    return new List<string>();
                }
                return ViewState["Languages"] as List<string>;
            }
            set
            {
                ViewState["Languages"] = value;
            }
        }

        public string LanguageFallback
        {
            get
            {
                if (ViewState["LanguageFallback"] == null)
                {
                    return null;
                }
                return (string)ViewState["LanguageFallback"];
            }
            set
            {
                ViewState["LanguageFallback"] = value;
            }
        }

        public string LanguageSelected
        {
            get { return ddlLanguage.SelectedValue; }
        }

        public LanguageMissingOption LanguageMissingOptionSelected
        {
            get { return ParseEnum<LanguageMissingOption>(rblLanguageMissing.SelectedValue); }
        }

        public LanguageReferenceOption LanguageReferenceOptionSelected
        {
            get { return ParseEnum<LanguageReferenceOption>(rblLanguageReference.SelectedValue); }
        }

        public ResourceReferenceOption ResourceReferenceOptionSelected
        {
            get { return ParseEnum<ResourceReferenceOption>(rblResourceReference.SelectedValue); }
        }

        public RecordExportOption RecordExportOptionSelected
        {
            get { return ParseEnum<RecordExportOption>(rblRecordExport.SelectedValue); }
        }

        public int ContentTypeIdSelected
        {
            get { return int.Parse(ddlContentType.SelectedValue); }
        }

        public string ContentTypeNameSelected
        {
            get { return ddlContentType.SelectedItem.Text; }
        }


        protected void Page_Load(object sender, EventArgs e)
        {
            if (IsPostBack)
            {
                return;
            }

            ApplicationId = Request["AppID"] != null ? int.Parse(Request["AppID"]) : new int?();

            var sexyContent = new SexyContent(true, new int?(), ApplicationId);

            LanguageFallback = PortalSettings.DefaultLanguage;
            Languages = sexyContent.ContentContext.GetLanguages()
                                                  .Where(language => language.Active)
                                                  .Select(language => language.ExternalKey)
                                                  .OrderBy(language => language != LanguageFallback)
                                                  .ThenBy(language => language)
                                                  .ToList();

            ddlLanguage.DataSource = Languages;
            ddlLanguage.DataBind();
            
            ddlContentType.DataSource = sexyContent.GetAvailableAttributeSets(); ;
            ddlContentType.DataBind();

            rblRecordExport.DataSource = EnumToDataSource<RecordExportOption>();
            rblRecordExport.DataBind();
            rblRecordExport.SelectedValue = RecordExportOption.All.ToString();

            rblLanguageMissing.DataSource = EnumToDataSource<LanguageMissingOption>();
            rblLanguageMissing.DataBind();
            rblLanguageMissing.SelectedValue = LanguageMissingOption.Create.ToString();

            rblLanguageReference.DataSource = EnumToDataSource<LanguageReferenceOption>();
            rblLanguageReference.DataBind();
            rblLanguageReference.SelectedValue = LanguageReferenceOption.Resolve.ToString();

            rblResourceReference.DataSource = EnumToDataSource<ResourceReferenceOption>();
            rblResourceReference.DataBind();
            rblResourceReference.SelectedValue = ResourceReferenceOption.Resolve.ToString();
        }


        protected void OnRecordExportSelectedIndexChanged(object sender, EventArgs e)
        {
            var recordExportOption = ParseEnum<RecordExportOption>(rblRecordExport.SelectedValue);
            pnlExportReferenceOptions.Enabled = !recordExportOption.IsBlank();
        }

        protected void OnExportDataClick(object sender, EventArgs e)
        {
            var dataXml = default(string);
            var dataSerializer = new DataXmlSerializer();
            
            if (RecordExportOptionSelected.IsBlank())
            {
                dataXml = dataSerializer.SerializeBlank(ApplicationId, ContentTypeIdSelected);
            }
            else
            {
                dataXml = dataSerializer.Serialize(ApplicationId, ContentTypeIdSelected, LanguageSelected, LanguageFallback, Languages, LanguageReferenceOptionSelected, ResourceReferenceOptionSelected);
            }


            var fileName = string.Format
                (
                    "SexyContent_{0}_{1}_{2}.xml",
                    ContentTypeNameSelected.Replace(" ", "-"),
                    LanguageSelected.Replace(" ", "-"),
                    RecordExportOptionSelected.IsBlank() ? "Template" : "Data"                  
                );
            Response.Clear();
            Response.Write(dataXml);
            Response.AddHeader("Content-Disposition", string.Format("attachment; filename={0}", fileName));
            Response.AddHeader("Content-Length", dataXml.Length.ToString());
            Response.ContentType = "text/xml";
            Response.End();
        }


        private IEnumerable<dynamic> EnumToDataSource<T>() where T : struct
        {
            return from Enum enumValue in Enum.GetValues(typeof(T))
                   select new
                   {
                       Value = enumValue,
                       Name = LocalizeString(typeof(T).Name + enumValue) // For example: LanguageReferenceOptionLink
                   };
        }

        private T ParseEnum<T>(string value) where T : struct
        {
            return (T)Enum.Parse(typeof(T), value, true);
        }
    }
}