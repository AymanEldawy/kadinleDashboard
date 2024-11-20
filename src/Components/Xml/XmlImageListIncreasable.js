import React, { useEffect, useState } from "react";
import { OfferRowView } from "../OfferTemplates/OfferRowView";

export const XmlImageListIncreasable = ({ data, setData }) => {
  return (
    <OfferRowView
      data={data}
      setData={setData}
      fields={[
        {
          name: "image1",
          label: "images",
        },
      ]}
    />
    // <div>
    //     <InputField />
    // </div>
  );
};
