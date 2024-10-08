import React, { useEffect, useMemo, useState } from "react";
import BlockPaper from "../../Components/BlockPaper/BlockPaper";
import { CategoryMultiFilter } from "../../Components/TableBar/CategoryMultiFilter";
import { Button } from "../../Components/Global/Button";
import { useFetch } from "../../hooks/useFetch";
import { useUpdate } from "../../hooks/useUpdate";
import { useGlobalOptions } from "../../Context/GlobalOptions";
import { CategoryInfo } from "../../Components/CategoryComponents/CategoryInfo";
import { CategoryFallbackForm } from "../../Components/CategoryComponents/CategoryFallbackForm";
import { useQuery } from "@tanstack/react-query";
import { getCacheCategory } from "../../Api/data";

const CategoryFallback = () => {
  const { updateItem } = useUpdate();
  const { getDataWithContent } = useFetch();
  const { defaultLanguage } = useGlobalOptions();
  const [category, setCategory] = useState(null);
  const [categoryId, setCategoryId] = useState(null);

  const content = useMemo(() => {
    return category?.category_content?.find(
      (c) => c?.language_id === defaultLanguage?.id
    );
  }, [category?.id]);

  const { data: CACHE_CATEGORIES } = useQuery({
    queryKey: ["CACHE_CATEGORIES", "category", defaultLanguage?.id],
    queryFn: async () => {
      if (!defaultLanguage?.id) return;
      return await getCacheCategory(defaultLanguage?.id);
    },
  });

  useEffect(() => {
    if (category) setCategory(null);
  }, [categoryId]);

  const getCategoryFallback = async () => {
    const res = await getDataWithContent("category", categoryId);
    setCategory(res?.data?.at(0));
  };

  const updateCategory = async (categories) => {
    return await updateItem("category", {
      id: category?.id,
      fallback_ids: categories,
    });
  };

  return (
    <BlockPaper title="Category Fallback">
      {category ? (
        <CategoryFallbackForm
          category={category}
          onClickCancel={() => setCategory(null)}
          CACHE_CATEGORIES={CACHE_CATEGORIES}
          updateCategory={updateCategory}
          oldCategories={category?.fallback_ids}
          name={content?.title}
        />
      ) : (
        <div className="flex gap-4 items-center">
          <CategoryMultiFilter
            name="category"
            filterCategory={categoryId}
            setFilterCategory={setCategoryId}
          />
          <Button
            title="Submit"
            disabled={!categoryId}
            classes="text-xs capitalize"
            onClick={getCategoryFallback}
          />
        </div>
      )}
    </BlockPaper>
  );
};

export default CategoryFallback;
