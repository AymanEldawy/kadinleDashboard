import React, { useCallback, useState } from "react";

import BlockPaper from "../../Components/BlockPaper/BlockPaper";
import { useQuery } from "@tanstack/react-query";
import { getCategoryTree } from "../../Api/data";
import { CategoryTreeItem } from "../../Components/CategoryComponents/CategoryTreeItem";

const CategoryTree = () => {
  const [selectedList, setSelectedList] = useState({});
  const [open, setOpen] = useState({});
  const [refetch, setRefresh] = useState(false);
  const { data: categoryTree } = useQuery({
    queryKey: ["category", "tree"],
    queryFn: async () => {
      const data = await getCategoryTree();
      return data;
    },
  });

  const toggleOpen = useCallback(
    (itemId, level) => {
      if (open[level] === itemId) {
        setOpen((prev) => {
          return {
            ...prev,
            [level]: "",
          };
        });
      } else
        setOpen((prev) => {
          return {
            ...prev,
            [level]: itemId,
          };
        });
    },
    [open]
  );

  const recursiveSelect = (hash, item, checked) => {
    if (!item) return hash;

    if (checked) {
      hash[item.id] = true;
    } else {
      delete hash[item.id];
    }

    if (item.children) {
      for (const child of item.children) {
        recursiveSelect(hash, child, checked);
      }
    }

    return hash;
  };

  const onSelectedItem = (event, item) => {
    const list = selectedList;
    setSelectedList(recursiveSelect(list, item, event.target.checked));
    setRefresh((p) => !p);
  };

  const displayTree = useCallback(
    (tree, level = 1) => {
      return tree?.map((item) => {
        return (
          <CategoryTreeItem
            key={item?.id}
            refetch={refetch}
            toggleOpen={() => toggleOpen(item?.id, level)}
            open={open}
            level={level}
            item={item}
            displayTree={displayTree}
            onSelectedItem={onSelectedItem}
            selectedList={selectedList}
          />
        );
      });
    },
    [open, toggleOpen]
  );

  return (
    <BlockPaper title="Category tree">
      <div className="flex capitalize font-medium text-base">
        <div className="w-16">#</div>
        <div className="flex-1">category</div>
        <div className="w-[150px] px-4">children count</div>
        <div className="w-[100px] px-4">Actions</div>
      </div>
      <ul className={`relative rounded-md color-level-0`}>
        {displayTree(categoryTree)}
      </ul>
    </BlockPaper>
  );
};

export default CategoryTree;
