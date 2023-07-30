import { addNewItem, updateItem } from "./globalActions";
import {
  uploadAvatarImage,
  uploadCategoryImage,
  uploadCollectionImage,
  uploadColorImage,
  uploadOfferImage,
  uploadReviewerImage,
} from "./upload";

export const handleUploadCategoryImages = async (
  item,
  itemId,
  CACHE_LANGUAGES,
  operation = "add"
) => {
  let theFileWebContent = item?.web_image;
  let theFileMobileContent = item?.mobile_image;
  const webPath =
    typeof theFileWebContent === "object"
      ? await uploadCategoryImage({
          categoryId: itemId,
          langName: CACHE_LANGUAGES[item?.language_id],
          file: theFileWebContent,
          type: "web",
        })
      : item?.web_image;
  if (webPath?.url) item.web_image = `https://` + webPath?.url;

  const mobilePath =
    typeof theFileMobileContent === "object"
      ? await uploadCategoryImage({
          categoryId: itemId,
          langName: CACHE_LANGUAGES[item?.language_id],
          file: theFileMobileContent,
          type: "mobile",
        })
      : item?.mobile_image;

  if (mobilePath?.url) item.mobile_image = `https://` + mobilePath?.url;
  if (operation === "add")
    await addNewItem(`category_content`, {
      ...item,
      category_id: itemId,
    });
  else
    await updateItem(`category_content`, {
      ...item,
      // category_id: itemId,
    });
};

export const handleUploadOfferImage = async (
  item,
  itemId,
  CACHE_LANGUAGES,
  operation = "add"
) => {
  let theFileWebContent = item?.media;
  const media =
    typeof theFileWebContent === "object"
      ? await uploadOfferImage({
          offerId: itemId,
          langName: CACHE_LANGUAGES[item?.language_id],
          file: theFileWebContent,
        })
      : item?.media;
  if (media?.url) item.media = `https://` + media?.url;
  if (operation === "add")
    await addNewItem(`offer_content`, {
      ...item,
      offer_id: itemId,
    });
  else
    await updateItem(`offer_content`, {
      ...item,
      // offer_id: itemId,
    });
};

export const handleUploadCollectionImage = async (
  item,
  itemId,
  CACHE_LANGUAGES,
  operation = "add"
) => {
  let theFileWebContent = item?.image;
  const image =
    typeof theFileWebContent === "object"
      ? await uploadCollectionImage({
          collectionId: itemId,
          langName: CACHE_LANGUAGES[item?.language_id],
          file: theFileWebContent,
        })
      : item?.image;
  if (image?.url) item.image = `https://` + image?.url;
  if (operation === "add")
    await addNewItem(`collection_content`, {
      ...item,
      collection_id: itemId,
    });
  else
    await updateItem(`collection_content`, {
      ...item,
      // collection_id: itemId,
    });
};
export const handleUploadColorImage = async (item) => {
  let theFileWebContent = item?.image;
  const image =
    typeof theFileWebContent === "object"
      ? await uploadColorImage({
          colorId: item?.id,
          file: theFileWebContent,
        })
      : item?.image;
  if (image?.url) {
    item.image = `https://` + image?.url;
    await updateItem(`color`, item);
  }
};
export const handleUploadReviewerImage = async (item, operation = "add") => {
  let theFileWebContent = item?.image;
  const image =
    typeof theFileWebContent === "object"
      ? await uploadReviewerImage({
          name: item?.name,
          file: theFileWebContent,
        })
      : item?.image;
  if (image?.url) {
    item.image = `https://` + image?.url;
    if (operation === "add") {
      await addNewItem(`home_reviews`, item);
    } else {
      await updateItem(`home_reviews`, item);
    }
  }
};
export const handleUploadAvatarImage = async (item) => {
  let theFileWebContent = item?.profile_img;

  const image =
    typeof theFileWebContent === "object"
      ? await uploadAvatarImage({
          userId: item?.id,
          file: theFileWebContent,
        })
      : item?.image;
  if (image?.url) {
    item.profile_img = `https://` + image?.url;
    await updateItem(`user`, item);
  }
};
