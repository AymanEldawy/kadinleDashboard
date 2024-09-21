import { addNewItem, updateItem } from "./globalActions";
import {
  globalUploadImage,
  uploadAvatarImage,
  uploadCategoryImage,
  uploadCategoryMedia,
  uploadCollectionImage,
  uploadColorImage,
  uploadOfferImage,
  uploadReviewerImage,
} from "./upload";

export const handleUploadCategoryImages = async (
  item,
  itemId,
  CACHE_LANGUAGES
) => {
  let theFileWebContent = item?.web_image;
  let theFileMobileContent = item?.mobile_image;
  const webPath =
    typeof theFileWebContent === "object" && theFileWebContent !== "{}"
      ? await uploadCategoryImage({
          categoryId: itemId,
          langName: CACHE_LANGUAGES[item?.language_id],
          file: theFileWebContent,
          type: "web",
        })
      : item?.web_image;
  if (webPath?.url) item.web_image = webPath?.url;

  const mobilePath =
    typeof theFileMobileContent === "object"
      ? await uploadCategoryImage({
          categoryId: itemId,
          langName: CACHE_LANGUAGES[item?.language_id],
          file: theFileMobileContent,
          type: "mobile",
        })
      : item?.mobile_image;

  if (mobilePath?.url) item.mobile_image = mobilePath?.url;
  if (!item?.id)
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

export const handleUploadOfferIcon = async (icon, itemId) => {
  if (typeof icon === "object" && icon !== "{}") {
    const offerIcon = await uploadOfferImage({
      offerId: itemId,
      langName: "global",
      file: icon,
    });
    await updateItem(`offer`, {
      icon: offerIcon?.url,
      id: itemId,
    });
  }
};

export const handleUploadOfferImage = async (item, itemId, CACHE_LANGUAGES) => {
  let theFileWebContent = item?.media;
  const media =
    typeof theFileWebContent === "object" && theFileWebContent !== "{}"
      ? await uploadOfferImage({
          offerId: itemId,
          langName: CACHE_LANGUAGES[item?.language_id],
          file: theFileWebContent,
        })
      : item?.media;

  if (media?.url) item.media = media?.url;
  if (!item?.id)
    await addNewItem(`offer_content`, {
      ...item,
      offer_id: itemId,
    });
  else
    await updateItem(`offer_content`, {
      ...item,
    });
};

export const handleUploadCollectionImage = async (
  item,
  itemId,
  CACHE_LANGUAGES
) => {
  let theFileWebContent = item?.image;
  const image =
    typeof theFileWebContent === "object" && theFileWebContent !== "{}"
      ? await uploadCollectionImage({
          collectionId: itemId,
          langName: CACHE_LANGUAGES[item?.language_id],
          file: theFileWebContent,
        })
      : item?.image;
  if (image?.url) item.image = image?.url;
  if (!item?.id)
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
    typeof theFileWebContent === "object" && theFileWebContent !== "{}"
      ? await uploadColorImage({
          colorId: item?.id,
          file: theFileWebContent,
        })
      : item?.image;
  if (image?.url) {
    item.image = image?.url;
    await updateItem(`color`, item);
  }
};

export const handleUploadPartnerImage = async (item) => {
  let theFileWebContent = item?.image;
  const image =
    typeof theFileWebContent === "object" && theFileWebContent !== "{}"
      ? await globalUploadImage({
          name: item?.name,
          file: theFileWebContent,
          action: "uploadPartner",
        })
      : item?.image;
  if (image?.url) {
    item.image = image?.url;
    if (!item?.id) {
      await addNewItem(`partner`, item);
    } else {
      await updateItem(`partner`, item);
    }
  }
};

export const handleUploadReviewerImage = async (item) => {
  let theFileWebContent = item?.image;
  const image =
    typeof theFileWebContent === "object" && theFileWebContent !== "{}"
      ? await globalUploadImage({
          name: item?.name,
          file: theFileWebContent,
          action: "uploadReviewer",
        })
      : item?.image;
  if (image?.url) {
    item.image = image?.url;
    if (!item?.id) {
      await addNewItem(`home_reviews`, item);
    } else {
      await updateItem(`home_reviews`, item);
    }
  }
};

export const handleUploadAvatarImage = async (item) => {
  let theFileWebContent = item?.profile_img;

  const image =
    typeof theFileWebContent === "object" && theFileWebContent !== "{}"
      ? await uploadAvatarImage({
          userId: item?.id,
          file: theFileWebContent,
        })
      : item?.image;
  if (image?.url) {
    item.profile_img = image?.url;
    await updateItem(`user`, item);
  }
};

export const handleUploadCategoryVideo = async (item) => {
  let theFileWebContent = item?.banner_video;
  const media =
    typeof theFileWebContent === "object" && theFileWebContent !== "{}"
      ? await uploadCategoryMedia({
          id: item?.id,
          file: theFileWebContent,
          type: "video",
        })
      : item?.banner_video;

  if (media?.url) item.banner_video = media?.url;

  await updateItem(`category`, {
    ...item,
  });
};

export const handleUploadCategoryImage = async (item) => {
  let theFileWebContent = item?.image;
  const media =
    typeof theFileWebContent === "object" && theFileWebContent !== "{}"
      ? await uploadCategoryMedia({
          id: item?.id,
          file: theFileWebContent,
          type: "icon",
        })
      : item?.image;

  if (media?.url) item.image = media?.url;

  await updateItem(`category`, {
    ...item,
  });
};

export const handleUploadSlider = async (item, key, folder = "slider") => {
  let theFileWebContent = item?.[key];
  const image =
    typeof theFileWebContent === "object" || theFileWebContent !== "{}"
      ? await globalUploadImage({
          name: folder,
          file: theFileWebContent,
          action: "uploadSlider",
        })
      : item?.[key];

  return image?.url || item?.[key];
};
