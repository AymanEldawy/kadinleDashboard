import axios from "axios";

export function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
}

export function openFullscreen() {
  let body = document.body;
  if (body.requestFullscreen) {
    body.requestFullscreen();
  } else if (body.webkitRequestFullscreen) {
    body.webkitRequestFullscreen();
  } else if (body.webkitRequestFullscreen) {
    body.webkitRequestFullscreen();
  } else if (body.msRequestFullscreen) {
    body.msRequestFullscreen();
  }
}

const tables = {
  country: {
    referenceTableName: "country",
    referenceId: "id",
  },
  category: {
    referenceTableName: "category_content",
    referenceId: "category_id",
  },
  language: {
    referenceTableName: "language",
    referenceId: "id",
  },
  collection: {
    referenceTableName: "collection_content",
    referenceId: "id",
  },
  collection_content: {
    referenceTableName: "collection_content",
    referenceId: "id",
  },
  color: {
    referenceTableName: "color_content",
    referenceId: "color_id",
  },
  size: {
    referenceTableName: "size_content",
    referenceId: "size_id",
  },
  region: {
    referenceTableName: "region",
    referenceId: "id",
  },
};

export const getTableContentName = (table) => {
  console.log(table);
  return tables?.[table];
};
