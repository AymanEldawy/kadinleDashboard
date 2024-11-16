import React, { useState } from "react";
import InputField from "../CustomForm/InputField";
import { OfferRowView } from "../OfferTemplates/OfferRowView";

export const XmlImageListIncreasable = () => {
  const [data, setData] = useState({
    1: {}
  });
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
