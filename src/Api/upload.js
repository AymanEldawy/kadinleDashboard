async function uploadFile(formData) {
  const headers = new Headers();
  headers.append(
    "key",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ewogICAgInJvbGUiOiAic2VydmljZV9yb2xlIiwKICAgICJpc3MiOiAic3VwYWJhc2UiLAogICAgImlhdCI6IDE2ODgyNDUyMDAsCiAgICAiZXhwIjogMTg0NjA5ODAwMAp9.Zbwwgxvz9VZm0zUmI-PN-xn71S_LGJYOnow-CKqoPgI"
  );

  const requestOptions = {
    method: "POST",
    headers: headers,
    body: formData,
    redirect: "follow",
  };

  const response = await fetch(
    "http://kadinle.com:4321/uploadProduct",
    requestOptions
  );
  return response?.json();
}

// export const uploadReviewer = async () => {};
// export const uploadInfluencer = async () => {}; // product_id / user_id

export const uploadProductImage = async ({ productId, colorId, file }) => {
  const formData = new FormData();
  formData.append("sku", productId);
  formData.append("color", colorId);
  formData.append("file", file);
  return await uploadFile(formData);
};

export const uploadCollection = async ({ collectionId, langName, file }) => {
  const formData = new FormData();
  formData.append("id", collectionId);
  formData.append("lang", langName);
  formData.append("file", file);
  return await uploadFile(formData);
};

export const uploadCategory = async ({ categoryId, langName, type, file }) => {
  const formData = new FormData();
  formData.append("id", categoryId);
  formData.append("lang", langName);
  formData.append("type", type);
  formData.append("file", file);
  return await uploadFile(formData);
};

export const uploadOffer = async ({ offerId, langName, file }) => {
  const formData = new FormData();
  formData.append("id", offerId);
  formData.append("lang", langName);
  formData.append("file", file);
  return await uploadFile(formData);
};

export const uploadColor = async ({ colorId, file }) => {
  const formData = new FormData();
  formData.append("id", colorId);
  formData.append("file", file);
  return await uploadFile(formData);
};
