import React, { useState } from 'react'
import { useGlobalOptions } from '../../Context/GlobalOptions';
import { useUpdate } from '../../hooks/useUpdate';
import { useQuery } from '@tanstack/react-query';
import { getProductEndingStock } from '../../Api/data';

const ProductsStatus = () => {
    let name = "products_slider";
    const { defaultLanguage } = useGlobalOptions();
    const { upsertItem, updateItem } = useUpdate();
    const [isProgress, setIsProgress] = useState(false);
    const [selectedList, setSelectedList] = useState({});
    const [pageCount, setPageCount] = useState(0);
    const [pagination, setPagination] = useState({
      pageSize: 50,
      pageIndex: 0,
    });

  
    const { data: suppliers } = useQuery({
      queryKey: ["list", "suppliers"],
      queryFn: async () => {
        const data = await getProductEndingStock();
        return data;
      },
    });
  return (
    <div>ProductsStatus</div>
  )
}

export default ProductsStatus