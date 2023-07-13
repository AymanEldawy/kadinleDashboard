// ******** load previous data ********** //

// ******** cache previous data ********** //

// ******** creation functions ********** //

const handelChange = async (file, setLogs) => {
  // ******* body ********* //
};

export const UploadSizesScript = async (file, setLogs) => {
  setLogs((prev) => [
    ...prev,
    { status: "loading", msg: "Starting Process..." },
  ]);
  // Promise.all(promiseList).then((res) => {
  // });
  handelChange(file, setLogs);
};
