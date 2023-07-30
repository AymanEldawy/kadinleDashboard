async function uploadFile(formData, action) {
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
    `http://kadinle.com:4321/${action}`,
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

export const uploadReviewerImage = async ({ name, file }) => {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("file", file);
  return await uploadFile(formData, "uploadReviewer");
};
export const uploadAvatarImage = async ({ userId, file }) => {
  const formData = new FormData();
  formData.append("user_id", userId);
  formData.append("file", file);
  return await uploadFile(formData, "uploadAvatar");
};
// export const uploadInfluencer = async () => {}; // product_id / user_id
