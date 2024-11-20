import React, { useState } from "react";
import { StepsBar } from "../../Components/Global/StepsBar";
import { XML_IMPORT_STEPS } from "../../Helpers/Scripts/constants";
import BlockPaper from "../../Components/BlockPaper/BlockPaper";
import { useFetch } from "../../hooks/useFetch";
import { XmlStageWrapper } from "../../Components/Xml/XmlStageWrapper";
import { XmlMapFields } from "../../Components/Xml/XmlMapFields";
import { XmlCreateTemplate } from "../../Components/Xml/XmlCreateTemplate";
import { XmlSecondMapFields } from "../../Components/Xml/XmlSecondMapFields";
import { XmlReport } from "../../Components/Xml/XmlReport";
import { XMLCreateFile, XMLgetTemplateFields } from "../../Api/xml";
import { toast } from "react-toastify";

const XMLImport = () => {
  // states
  const { getData } = useFetch();
  const [loading, setLoading] = useState(false);
  const [fileId, setFileId] = useState(93);
  const [url, setUrl] = useState(null);
  const [template, setTemplate] = useState({});
  const [error, setError] = useState(null);
  const [activeIndex, setActiveIndex] = useState(2);
  const STAGES = XML_IMPORT_STEPS.map((step) => step.name);
  const [fileFields, setFileFields] = useState({});

  const goNext = async () => {
    if (activeIndex === 0) {
      await handleSubmitCreateXml();
      if (!url) toast.error(`Url is required`);
      return;
    }

    if (activeIndex === 1) {
      const templateResponse = await XMLCreateFile({
        url: "https://www.depoxml.com/xml.php?c=shopphp&xmlc=1b2507dbf4",
        template: {
          root: "",
          list: "urunler",
          item: "urun",
          sku: "urun_ID",
          name: "urun_ad",
          details: "urun_aciklama",
          brand: "urun_marka_ad",
          category: "urun_kategori_path",
          price: "urun_fiyat",
          is_price_in_variant: false,
          stock: "",
          is_stock_in_variant: true,
          is_image_list: false,
          image_list: "",
          image_list_item: "",
          image_fields: [
            "urun_resim1",
            "urun_resim2",
            "urun_resim3",
            "urun_resim4",
            "urun_resim5",
          ],
          has_variants: true,
          variant_list: "urun_varyasyonlari",
          variant_list_item: "varyasyon",
          variant_sku: "gtin",
          variant_stock_quantity: "stok",
          variant_stock_code: "DXBarcode",
          variant_price: "",
          is_variant_specs_list: false,
          variant_specs_list: "",
          variant_color_name: "",
          variant_color_value: "DXBarcode",
          variant_size_name: "var1.0.$.baslik",
          variant_size_value: "var1.0.$.varyasyon",
        },
      });

      console.log(templateResponse);

      return;
    }
    setActiveIndex((p) => (p += 1));
  };

  console.log(template);

  const goBack = () => {
    if (activeIndex === 0) return;
    setActiveIndex((p) => (p -= 1));
  };

  const handleSubmitCreateXml = async () => {
    setLoading(true);
    setError(null);
    const response = await XMLgetTemplateFields(url);
    if (response?.success) {
      let data = [];
      for (const item of response?.data) {
        if (item)
          data.push({
            label: item,
            value: item,
          });
      }
      setFileFields(data);
    } else {
      setError(error);
      setLoading(false);
    }
  };

  return (
    <>
      <BlockPaper title="XML import">
        <div className=" container max-w-[1200px] mx-auto">
          <StepsBar items={XML_IMPORT_STEPS} activeIndex={activeIndex} />
          <div className="mt-10">
            {activeIndex === 0 ? (
              <XmlStageWrapper
                title="create template"
                children={<XmlCreateTemplate url={url} setUrl={setUrl} />}
              />
            ) : null}

            {activeIndex === 1 ? (
              <XmlStageWrapper
                title="Mapping Schema"
                children={
                  <XmlMapFields
                    goBack={goBack}
                    goNext={goNext}
                    fileFields={fileFields}
                    template={template}
                    setTemplate={setTemplate}
                  />
                }
              />
            ) : null}

            {activeIndex === 2 ? (
              <XmlStageWrapper
                title="Second Mapping Schema"
                children={<XmlSecondMapFields fileId={fileId} />}
              />
            ) : null}
            {activeIndex === 3 ? (
              <XmlStageWrapper
                title="Report"
                children={<XmlReport goBack={goBack} goNext={goNext} />}
              />
            ) : null}
            {activeIndex === 4 ? (
              <XmlStageWrapper
                title="Done"
                children={<XmlMapFields goBack={goBack} goNext={goNext} />}
              />
            ) : null}
          </div>
          <div className="flex items-center justify-between mt-4">
            <button
              disabled={activeIndex === 0}
              onClick={goBack}
              className="disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed disabled:opacity-60 bg-blue-500 active:bg-blue-700 px-2 py-1 rounded-md text-white"
            >
              Back
            </button>
            <button
              onClick={goNext}
              disabled={activeIndex === 4}
              className="disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed disabled:opacity-60 bg-blue-500 active:bg-blue-700 px-2 py-1 rounded-md text-white"
            >
              Next
            </button>
          </div>
        </div>
      </BlockPaper>
    </>
  );
};

export default XMLImport;
