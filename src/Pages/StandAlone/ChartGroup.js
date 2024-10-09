import React, { useEffect, useState } from "react";
import BlockPaper from "../../Components/BlockPaper/BlockPaper";
import { CategoryMultiFilter } from "../../Components/TableBar/CategoryMultiFilter";
import { Button } from "../../Components/Global/Button";
import { useFetch } from "../../hooks/useFetch";
import { useUpdate } from "../../hooks/useUpdate";
import { useGlobalOptions } from "../../Context/GlobalOptions";
import { CategoryFallbackForm } from "../../Components/CategoryComponents/CategoryFallbackForm";
import { useQuery } from "@tanstack/react-query";
import { getCacheCategory } from "../../Api/data";
import { useNavigate, useParams } from "react-router-dom";
import { useAdd } from "../../hooks/useAdd";
import InputField from "../../Components/CustomForm/InputField";

const ChartGroup = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { getData } = useFetch();
  const { addItem } = useAdd();
  const { updateItem } = useUpdate();
  const { defaultLanguage } = useGlobalOptions();
  const [group_name, setGroup_name] = useState(null);

  const { data: chartGroup } = useQuery({
    queryKey: ["chart_group", params?.id, defaultLanguage?.id],
    queryFn: async () => {
      if (!defaultLanguage?.id || !params.id) return;

      const data = await getData("chart_group", params.id);
      setGroup_name(data?.at(0)?.group_name);
      return data?.at(0);
    },
  });

  const { data: CACHE_CATEGORIES } = useQuery({
    queryKey: ["CACHE_CATEGORIES", "category", defaultLanguage?.id],
    queryFn: async () => {
      if (!defaultLanguage?.id) return;
      return await getCacheCategory(defaultLanguage?.id);
    },
  });

  const updateCategory = async (categories) => {
    console.log("🚀 ~ updateCategory ~ categories:", categories);
    if (params?.id) {
      return await updateItem("chart_group", {
        id: params?.id,
        group_name,
        chart_group_ids: categories,
      });
    } else {
      const res = await addItem("chart_group", {
        group_name,
        chart_group_ids: categories,
      });
      console.log(res);

      return res;
    }
  };
console.log(chartGroup,'chartGroup');

  return (
    <BlockPaper title="Chart Group">
      <CategoryFallbackForm
        onClickCancel={() => navigate("/chart-group")}
        CACHE_CATEGORIES={CACHE_CATEGORIES}
        updateCategory={updateCategory}
        oldCategories={chartGroup?.chart_group_ids}
        name={
          <InputField
            label={"group name"}
            name="group_name"
            value={group_name}
            onChange={(e) => setGroup_name(e.target.value)}
          />
        }
      />
    </BlockPaper>
  );
};

export default ChartGroup;
