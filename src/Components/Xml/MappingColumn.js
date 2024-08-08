import AsyncSelect from "react-select/async";
import Tooltip from "./Tooltip";

export const MappingColumn = ({
  data,
  categories,
  title,
  className,
  setXmlValuesPayload,
}) => {
  const filterCategories = (inputValue) => {
    if (!categories) return [];
    return categories?.data
      .map((item) => item?.title)
      .filter((value) =>
        value.toLowerCase().includes(inputValue.toLowerCase())
      );
  };
  const promiseCategoriesOptions = (inputValue) =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(filterCategories(inputValue));
      }, 1000);
    });


  return (
    <div className={`left flex flex-col gap-3 mt-1 ${className}`}>
      <h2>{title}</h2>
      {data?.map((item, index) => (
        <div
          key={index}
          className="text-gray-500 flex items-center w-full gap-4"
        >
          {title === "Categories" ? (
            <Tooltip text={item} />
          ) : (
            <p className="w-[100px]">{item}</p>
          )}

          {title === "Categories" && (
            <span className=" text-white bg-slate-400 rounded-sm text-[12px] px-1">
              required
            </span>
          )}

          {title === "Categories" ? (
            <AsyncSelect
              placeholder="Category..."
              required
              className="flex-1"
              cacheOptions
              onChange={(e) => {
                const newCategoryItem = {
                  foreign: categories?.data[e.value].title,
                  local: categories?.data[e.value].category_id,
                };

                setXmlValuesPayload((prevState) => ({
                  ...prevState,
                  category: [...prevState.category, newCategoryItem],
                }));
              }}
              defaultOptions={categories?.data
                .map((item) => item?.title)
                .map((value, index) => ({
                  label: value,
                  value: index,
                }))}
              loadOptions={(inputValue) =>
                promiseCategoriesOptions(inputValue).then((options) =>
                  options.map((value) => ({
                    label: value,
                    value: value,
                  }))
                )
              }
            />
          ) : title === "Colors" ? (
            <AsyncSelect
              placeholder={title}
              required
              className="flex-1 min-w-[180px]"
              cacheOptions
              onChange={(e) => {
                const newCategoryItem = {
                  foreign: categories?.data[e.value].name,
                  local: categories?.data[e.value].color_id,
                };

                setXmlValuesPayload((prevState) => ({
                  ...prevState,
                  color: [...prevState.color, newCategoryItem],
                }));
              }}
              defaultOptions={categories?.data
                .map((item) => item?.name)
                .map((value,index) => ({
                  label: value,
                  value: index,
                }))}
              loadOptions={(inputValue) =>
                promiseCategoriesOptions(inputValue).then((options) =>
                  options.map((value) => ({
                    label: value,
                    value: value,
                  }))
                )
              }
            />
          ) : (
            <AsyncSelect
              placeholder={title}
              required
              className="flex-1 min-w-[180px]"
              cacheOptions
              onChange={(e) => {
                const newCategoryItem = {
                  foreign: categories?.data[e.value].name,
                  local: categories?.data[e.value].size_id,
                };

                setXmlValuesPayload((prevState) => ({
                  ...prevState,
                  size: [...prevState.size, newCategoryItem],
                }));
              }}
              defaultOptions={categories?.data
                .map((item) => item?.name)
                .map((value,index) => ({
                  label: value,
                  value: index,
                }))}
              loadOptions={(inputValue) =>
                promiseCategoriesOptions(inputValue).then((options) =>
                  options.map((value) => ({
                    label: value,
                    value: value,
                  }))
                )
              }
            />
          )}
        </div>
      ))}
    </div>
  );
};
