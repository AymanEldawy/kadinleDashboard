import { v4 as uuidv4 } from "uuid";

async function uploadFile(formData, action) {
  const originalFile = formData.get("file");

  if (!originalFile) {
    console.log("No file found in formData.");
    return;
  }

  if (
    typeof originalFile?.name !== "string" ||
    !originalFile?.name.includes(".")
  ) {
    console.error("Invalid file name.");
    return;
  }

  const newFileName =
    `file-${uuidv4()}` + originalFile?.name?.split(".")?.pop();

  const newFile = new File([originalFile], newFileName, {
    type: originalFile.type,
  });
  console.log(newFileName);

  formData.delete("file");

  formData.append("file", newFile);

  const headers = new Headers();
  headers.append(
    "key",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ewogICAgInJvbGUiOiAic2VydmljZV9yb2xlIiwKICAgICJpc3MiOiAic3VwYWJhc2UiLAogICAgImlhdCI6IDE2ODgyNDUyMDAsCiAgICAiZXhwIjogMTg0NjA5ODAwMAp9.Zbwwgxvz9VZm0zUmI-PN-xn71S_LGJYOnow-CKqoPgI"
  );

  if (action === "uploadAvatar") {
    headers.append("user_id", formData.get("user_id"));
  }

  const requestOptions = {
    method: "POST",
    headers: headers,
    body: formData,
    redirect: "follow",
  };

  const response = await fetch(
    `${process.env.REACT_APP_KADINLE_API}/${action}`,
    // `http://localhost:4321/${action}`,
    requestOptions
  );
  return response?.json();
}

export const uploadProductImage = async ({ productSku, colorSku, file }) => {
  const formData = new FormData();
  formData.append("sku", productSku);
  formData.append("color", colorSku);
  formData.append("file", file);
  return await uploadFile(formData, "uploadProduct");
};

export const uploadCollectionImage = async ({
  collectionId,
  langName,
  file,
}) => {
  const formData = new FormData();
  formData.append("id", collectionId);
  formData.append("lang", langName);
  formData.append("file", file);
  return await uploadFile(formData, "uploadCollection");
};

export const uploadCategoryImage = async ({
  categoryId,
  langName,
  type,
  file,
}) => {
  const formData = new FormData();
  formData.append("id", categoryId);
  formData.append("lang", langName);
  formData.append("type", type);
  formData.append("file", file);
  return await uploadFile(formData, "uploadCategory");
};

export const uploadOfferImage = async ({ offerId, langName, file }) => {
  const formData = new FormData();
  formData.append("id", offerId);
  formData.append("lang", langName);
  formData.append("file", file);
  return await uploadFile(formData, "uploadOffer");
};

export const uploadColorImage = async ({ colorId, file }) => {
  const formData = new FormData();
  formData.append("id", colorId);
  formData.append("file", file);
  return await uploadFile(formData, "uploadColor");
};

export const globalUploadImage = async ({ name, file, action }) => {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("file", file);
  return await uploadFile(formData, action);
};

export const uploadAvatarImage = async ({ userId, file }) => {
  const formData = new FormData();
  formData.append("user_id", userId);
  formData.append("file", file);
  return await uploadFile(formData, "uploadAvatar");
};

export const uploadCategoryMedia = async ({ id, file, type }) => {
  const formData = new FormData();
  formData.append("id", id);
  formData.append("lang", "ALL");
  formData.append("type", type);
  formData.append("file", file);
  return await uploadFile(formData, "uploadCategory");
};
