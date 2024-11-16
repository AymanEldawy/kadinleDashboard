import React from "react";
import { XmlImageListIncreasable } from "./XmlImageListIncreasable";
const fields = {
  url: "http://www.niloshka.com/TicimaxXml/12B48A2226914F188009EFF643F8708F",
  template: {
    root: "Root",
    list: "Urunler",
    item: "Urun",
    sku: "UrunKartiID",
    name: "OnYazi",
    details: "Aciklama",
    brand: "Marka",
    category: "KategoriTree",
    price: "",
    is_price_in_variant: false,
    stock: "quantity",
    is_stock_in_variant: false,
    is_image_list: true,
    image_list: "Resimler",
    image_list_item: "Resim",
    image_fields: [
      // "image1",
      // "image2",
      // "image3",
      // "image4",
      // "image5",
      // "image6"
      // "image7",
      // "image8"
    ],
    has_variants: true,
    variant_list: "UrunSecenek",
    variant_list_item: "Secenek",
    variant_sku: "Barkod",
    variant_stock_quantity: "StokAdedi",
    variant_stock_code: "Barkod",
    variant_price: "AlisFiyati",
    is_variant_specs_list: true,
    variant_specs_list: "EkSecenekOzellik",
    variant_color_name: "name1",
    variant_color_value: "value1",
    variant_size_name: "Ozellik.0.$.Tanim",
    variant_size_value: "Ozellik.0.$.Deger",
  },
};
export const XmlMapFields = ({ setActiveStage }) => {
  return (
    <div>
      tet
      {Object.keys(fields.template).map((field) => (
        <span className="flex">{field}</span>
      ))}
      <XmlImageListIncreasable />
    </div>
  );
};
