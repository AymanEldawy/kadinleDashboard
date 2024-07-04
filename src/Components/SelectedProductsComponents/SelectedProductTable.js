import React, { useCallback, useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate';

import { useGlobalOptions } from '../../Context/GlobalOptions';
import COMBINE_DB_API from '../../Helpers/Forms/combineTables';
import { BookMarkIcon, ChevronIcon, CloseIcon, EyeIcon, PlusIcon } from '../../Helpers/Icons';
import MinusIcon from '../../Helpers/Icons/MinusIcon';
import { useDelete } from '../../hooks/useDelete';
import { useFetch } from '../../hooks/useFetch';
import SuperTable from '../CustomTable/SuperTable'
import Table from '../CustomTable/Table'
import TableBody from '../CustomTable/TableBody';
import TableCol from '../CustomTable/TableCol';
import TableHead from '../CustomTable/TableHead';
import TableHeadCol from '../CustomTable/TableHeadCol';
import TableRow from '../CustomTable/TableRow';
import { TableBar } from '../TableBar/TableBar';
import { Link } from 'react-router-dom';
import { getRowsById, removeItemsFrom } from '../../Api/globalActions';
import { toast } from 'react-toastify';

export const SelectedProductTable = ({
  selectedList,
  setSelectedList,
  insertMany,
  additionalData,
  setProductLength,
  tableName,
  id
}) => {
  const { defaultLanguage, defaultRegion } = useGlobalOptions();
  const { getDataWithPagination } = useFetch();
  const { getData } = useFetch();
  const [data, setData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [selectedColumn, setSelectedColumn] = useState('')
  const [pageCount, setPageCount] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(50);
  const [itemOffset, setItemOffset] = useState(0);
  const [filterCategory, setFilterCategory] = useState();
  const [refresh, setRefresh] = useState(false);
  const [products, setProducts] = useState({});

  useEffect(() => {
    setProductLength(typeof selectedList === 'object' ? Object.keys(selectedList)?.length : 0)
  }, [selectedList, refresh])

  const fetchData = async () => {
    let filter = filterCategory?.indexOf("Choose") !== -1 ? "" : filterCategory;
    const response = await getDataWithPagination(
      'product',
      itemOffset + 1,
      itemsPerPage,
      {
        languageId: defaultLanguage?.id,
        regionId: defaultRegion?.id,
        filter,
        search: { key: selectedColumn, value: searchValue },
        ...additionalData
      }
    );
    setPageCount(Math.ceil(response?.count / parseInt(itemsPerPage)));
    setData(response?.data);

  };

  const getProductsIds = async () => {
    const response = tableName === 'sale' ? await getData('sale') : await getRowsById(`${tableName}_product`, `${tableName}_id`, id)
    let CACHE_PRODUCTS = {}
    let data = tableName === 'sale' ? response : response?.data;
    for (const product of data) {
      CACHE_PRODUCTS[product?.product_id] = product?.product_id
    }
    setSelectedList({ ...CACHE_PRODUCTS });
    setProducts({ ...CACHE_PRODUCTS });
  }

  useEffect(() => {
    getProductsIds()
  }, [id])

  useEffect(() => {
    if (defaultLanguage?.id && defaultRegion?.id) fetchData();
  }, [
    pageCount,
    itemsPerPage,
    itemOffset,
    filterCategory,
    defaultLanguage?.id,
    defaultRegion?.id,
    searchValue
  ]);

  const columns = COMBINE_DB_API.combine_collection_product;


  const handleSelectedAll = useCallback(
    (e) => {
      if (!e?.target?.checked) {
        setSelectedList({});
      } else {
        let newList = {};
        let count = 0;
        for (const key in data) {
          let uniqueKey = data?.[key]?.id
            ? data?.[key]?.id
            : data?.[key]?.email;
          if (count >= itemsPerPage) break;
          newList[uniqueKey] = uniqueKey;
          count++;
        }
        setSelectedList(newList);
      }
    },

    [itemsPerPage, data, setSelectedList]
  );

  const handelSelect = (itemId) => {
    if (selectedList[itemId]) {
      let newSelectedList = selectedList;
      delete newSelectedList[itemId];
      setSelectedList((prev) => {
        return {
          ...prev,
          ...newSelectedList,
        };
      });
    } else {
      setSelectedList((prev) => {
        return {
          ...prev,
          [itemId]: itemId,
        };
      });
    }
  };

  const handleDeleteItem = async (list = selectedList) => {
    let loadLanguage = toast.loading("Please wait...");
    let table = tableName === 'sale' ? tableName : `${tableName}_product`;
    const response = await removeItemsFrom(table, {
      table_id: id,
      ids: Object.keys(list),
      col: tableName !== 'sale' ? `${tableName}_id` : undefined,
    })
    if (response.error) {
      toast.update(loadLanguage, {
        render: response.error || "Field remove, please try again",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
    } else {
      toast.update(loadLanguage, {
        render: "Successfully removed",
        type: "success",
        isLoading: false,
        autoClose: 1000,
      });
      getProductsIds()
      setRefresh(p => !p)
    };
  }

  const saveChanges = async () => {
    //loop of selected if 
    let productsList = Object.keys(products);
    let listOfIds = Object.keys(selectedList);
    let deleteList = {};
    let insertList = {};
    if (productsList?.length) {
      for (const id of productsList) {
        if (!selectedList?.[id]) {
          deleteList[id] = id;
        }
      }
      handleDeleteItem(deleteList)
    }
    if (listOfIds?.length) {
      for (const id of listOfIds) {
        if (!products?.[id]) {
          insertList[id] = id
        }
      }
      await insertMany(insertList)
      getProductsIds()
    }
  }

  const handleUnSelect = async (productId) => {
    let newSelectedList = selectedList
    delete newSelectedList[productId]
    setSelectedList(newSelectedList)
    setRefresh(p => !p)
  }

  const handlePageClick = (index) => {
    setItemOffset(index);
  };


  return (
    <div>
      <TableBar
        onDeleteClick={handleDeleteItem}
        setSearchValue={setSearchValue}
        onSelectChange={setItemsPerPage}
        itemsPerPage={itemsPerPage}
        selectedList={selectedList}
        allowFilter
        filterCategory={filterCategory}
        setFilterCategory={setFilterCategory}
        customBarButtons={
          <>
            <button onClick={saveChanges} title='Save Changes' className='p-2 rounded-md bg-primary-green text-white'><BookMarkIcon className="h-5 w-5" /></button>
            <button onClick={insertMany} title="Choose all" className='p-2 rounded-md bg-primary-blue text-white'><PlusIcon /></button>
          </>
        }
        columns={() => {}}
        selectedColumn={selectedColumn}
        setSelectedColumn={setSelectedColumn}

      />
      <Table
        containerClassName="rounded-none"
      >
        <TableHead>
          <TableRow>
            <TableHeadCol
              contentClassName={`  flex justify-center `}
              classes={` !w-[50px]`}
            >
              <input
                type="checkbox"
                className="w-4 h-4 "
                onChange={handleSelectedAll}
              />
            </TableHeadCol>
            {columns()?.map((col, index) => {
              if (col === "id") return null;
              else
                return (
                  <TableHeadCol
                    contentClassName={` ${col?.accessorKey === "description" || col?.accessorKey === "name"
                      ? "min-w-[160px]"
                      : ""
                      }`}
                    classes={''}
                    key={`${col?.header}-${index}`}
                  // sort
                  // sortBy={sortBy}
                  >
                    {col?.header}
                  </TableHeadCol>
                );
            })}
            <TableHeadCol
              contentClassName={``}
              classes={` w-[90px]`}
            >
              Action
            </TableHeadCol>
          </TableRow>
        </TableHead>
        <TableBody classes={''}>
          {
            data?.map(product => {
              let selected = !!selectedList?.[product?.id]
              return (
                <TableRow classes={`${selected ? 'bg-blue-50' : ''}`}>
                  <TableCol classes={`!py-4 border`}>
                    {
                      selected ? (
                        <button onClick={() => handleUnSelect(product?.id)} ><CloseIcon /></button>
                      ) : (
                        <input
                          className="w-4 h-4 mx-auto block"
                          type="checkbox"
                          onChange={() => handelSelect(product?.id)}
                        />
                      )
                    }

                  </TableCol>
                  <TableCol classes={`!py-4 border`}>
                    {product?.product_sku}
                  </TableCol>
                  <TableCol classes={`!py-4 border`}>
                    {product?.product_content?.[0]?.name}
                  </TableCol>
                  <TableCol classes={`!py-4 border`}>
                    {product?.category?.category_content?.[0]?.title}
                  </TableCol>
                  <TableCol classes={`!py-4 border`}>
                    {product?.barcode}
                  </TableCol>
                  <TableCol classes={`!py-4 border`}>
                    <Link to={`/products/update/product/${product?.id}`} className='hover:translate-x-1 transition-transform rounded-2xl px-2 p-1 bg-primary-blue text-white'>
                      <EyeIcon className=" w-4 h-4" />
                    </Link>
                  </TableCol>
                </TableRow>

              )
            })
          }
        </TableBody>
      </Table>
      {pageCount ? (
        <>
          <ReactPaginate
            breakLabel="..."
            nextLabel={
              <span className="flex  scale-75 ltr:rotate-180 rtl:-rotate-180">
                <ChevronIcon />
              </span>
            }
            onPageChange={({ selected }) => handlePageClick(selected)}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            forcePage={itemOffset}
            previousLabel={
              <span className="flex scale-75 rtl:rotate-180">
                <ChevronIcon />
              </span>
            }
            renderOnZeroPageCount={null}
            className="pagination flex gap-6 items-center shadow p-3 bg-white dark:bg-bgmaindark"
            activeClassName="bg-blue-500 p-1 px-2 rounded text-sm text-white"
            previousClassName="ltr:rotate-90 rtl:-rotate-90 rounded-md dark:bg-borderdark dark:text-gray-50 text-gray-500 bg-gray-100 shadow px-1"
            nextClassName="ltr:rotate-90 rtl:-rotate-90 rounded-md dark:bg-borderdark dark:text-gray-50 text-gray-500 bg-gray-100 shadow px-1"
            disabledClassName="text-gray-200 dark:text-gray-600"
          />
        </>
      ) : null}

    </div>
  )
}
