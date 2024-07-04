import React from "react";
import TabsContent from "../../Components/Tabs/TabsContent";
import { StepsBar } from "../../Components/Global/StepsBar";
import { XML_IMPORT_STEPS } from "../../Helpers/Scripts/constants";
import BlockPaper from "../../Components/BlockPaper/BlockPaper";

const XMLImport = () => {
  return (
    <BlockPaper title="XML import">
      <StepsBar  items={XML_IMPORT_STEPS} />
      <TabsContent></TabsContent>
      {/* STEPS */}
      {/* BODY */}
    </BlockPaper>
  );
};

export default XMLImport;
