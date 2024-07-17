import { useTranslation } from "react-i18next";
import { ChevronIcon } from "../../Helpers/Icons";

export const TablePagination = ({ table }) => {
  const { t } = useTranslation();

  return (
    <div className="flex items-center gap-2 border-t pt-2 dark:border-dark-border">
      <button
        className="border rounded p-1 disabled:bg-gray-200 opacity-50 dark:disabled:bg-dark-bg"
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        <ChevronIcon className="h-4 w-4 ltr:rotate-90 rtl:-rotate-90" />
      </button>
      <button
        className="border rounded p-1 disabled:bg-gray-200 opacity-50 dark:disabled:bg-dark-bg"
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        <ChevronIcon className="h-4 w-4 ltr:-rotate-90 rtl:rotate-90" />
      </button>
      <span className="flex items-center gap-1">
        <div>{t("page")}</div>
        <strong>
          {table.getState().pagination.pageIndex + 1} {t("of")}{" "}
          {table.getPageCount()}
        </strong>
      </span>
      <span className="flex items-center gap-1">
        | {t("go_to_page")}:
        <input
          type="number"
          defaultValue={table.getState().pagination.pageIndex}
          onChange={(e) => {
            const page = e.target.value ? Number(e.target.value) - 1 : 0;
            table.setPageIndex(page);
          }}
          className="border p-1 rounded w-16"
        />
      </span>
      <select
        className="border p-1 rounded-md"
        value={table.getState().pagination.pageSize}
        onChange={(e) => {
          table.setPageSize(Number(e.target.value));
        }}
      >
        {[20, 50, 100, 250, 500, 1000].map((pageSize) => (
          <option key={pageSize} value={pageSize}>
            {t("show")} {pageSize}
          </option>
        ))}
      </select>
    </div>
  );
};
