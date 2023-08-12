import React from 'react'

import SuperTable from '../../Components/CustomTable/SuperTable'

export const ProductTable = () => {
  return (
    <div>

      {/* <SuperTable
        itemOffset={itemOffset}
        itemsPerPage={itemsPerPage}
        setPageCount={setPageCount}
        pageCount={pageCount}
        deleteItem={deleteItem}
        handlePageClick={handlePageClick}
        columns={columns}
        data={data}
        allowSelect={hideSelect || hideDelete ? false : true}
        selectedList={selectedList}
        setSelectedList={setSelectedList}
        loading={loading}
        tableName={tableName}
        allowActions={hideAction ? false : true}
        hidePagination={hidePagination}
        actionKey="Actions"
        actionsContent={(data) => {
          if (!!renderTableAction) return renderTableAction(data);
          return (
            <Link
              to={`/update/${tableName}/${data?.id}`}
              state={data}
              className="text-blue-400 underline"
            >
              Edit
            </Link>
          );
        }}
      /> */}
    </div>
  )
}
