import React, { useEffect, useState } from 'react'
import { useGlobalOptions } from '../../Context/GlobalOptions';
import DynamicList from '../../Pages/Dynamics/DynamicList';
import COMBINE_DB_API from '../../Helpers/Forms/combineTables';
import { useFetch } from '../../hooks/useFetch';
import { getRowsById, getRowsByIds } from './../../Api/globalActions';
import Modal from '../Modal/Modal';
import { useRemove } from '../../hooks/useRemove';
import { EyeIcon } from '../../Helpers/Icons';

export const CollectionProductsCol = ({ collectionId, tableName, scope, classes, ...props }) => {
  const { getData } = useFetch()
  const { removeItems } = useRemove()
  const [selectedList, setSelectedList] = useState({})
  const [productIds, setProductsIds] = useState([]);
  const [open, setOpen] = useState(false)
  const [refresh, setRefresh] = useState(false)
  const columns = COMBINE_DB_API.combine_collection_product || [];

  const getIds = async () => {
    const response = tableName === 'sale' ? await getData(tableName) : await getRowsById(`${tableName}_product`, `${tableName}_id`, collectionId);
    console.log(response, collectionId);
    let data = tableName === 'sale' ? response : response?.data
    setProductsIds(data?.map(col => col?.product_id));
  }

  useEffect(() => {
    getIds()
  }, [collectionId, refresh])

  const removeProductFromCollection = async () => {
    let table = tableName === 'sale' ? tableName : `${tableName}_product`;
    await removeItems(table, {
      table_id: collectionId,
      ids: Object.keys(selectedList),
      col: tableName !== 'sale' ? `${tableName}_id` : undefined,
    })
    setRefresh(p => !p)
  }

  return (
    <>
      <td
        key={collectionId}
        colSpan={scope ? scope : 1}
        className={`p-2 ${classes} !border-inherit`}
        {...props}
      >
        <div className="flex items-center w-full text-center justify-center ">
          {
            productIds?.length ? (
              <button onClick={() => productIds?.length ? setOpen(true) : undefined} className='capitalize text-primary-green p-2 rounded-md px-4 border-primary-green border bg-green-50 flex items-center gap-2 font-medium'>
                <EyeIcon />
                {productIds?.length} products
              </button>
            ) : (
              <p>No selected products</p>
            )
          }
        </div>
      </td>
      <Modal open={open} onClose={() => setOpen(false)}>
        <DynamicList
          tableName="product"
          columns={columns}
          // renderTableAction={renderTableAction}
          // oldValue={oldValue}
          // onAddClick={onAddClick}
          selectedList={selectedList}
          setSelectedList={setSelectedList}
          // hideBar={hideBar}
          // hideAction={hideAction}
          // hideSelect={hideSelect}
          outerDelete={removeProductFromCollection}
          // allowFilter={allowFilter}
          // customBarButtons={customBarButtons}

          additionalData={{
            product_ids: productIds,
            filtersByIds: true
          }}
        />
      </Modal>
    </>

  )
}
