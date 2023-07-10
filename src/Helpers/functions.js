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
  user: {
    referenceTableName: "user",
    referenceId: "id",
  },
  country: {
    referenceTableName: "country",
    referenceId: "id",
  },
  language: {
    referenceTableName: "language",
    referenceId: "id",
  },
  warehouse: {
    referenceTableName: "warehouse",
    referenceId: "id",
  },
  address: {
    referenceTableName: "address",
    referenceId: "id",
  },
  default_address: {
    referenceTableName: "address",
    referenceId: "id",
  },
  chart: {
    referenceTableName: "chart",
    referenceId: "id",
  },
  category: {
    referenceTableName: "category_content",
    referenceId: "category_id",
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
  product: {
    referenceTableName: "product_content",
    referenceId: "product_id",
  },
  product_content: {
    referenceTableName: "product_content",
    referenceId: "product_id",
  },
  product_image: {
    referenceTableName: "product_content",
    referenceId: "product_id",
  },
  order: {
    referenceTableName: "order_content",
    referenceId: "order_id",
  },
  fabric: {
    referenceTableName: "fabric_content",
    referenceId: "fabric_id",
  },
  sleeve: {
    referenceTableName: "sleeve_content",
    referenceId: "sleeve_id",
  },
  season: {
    referenceTableName: "season_content",
    referenceId: "season_id",
  },
  lining: {
    referenceTableName: "lining_content",
    referenceId: "lining_id",
  },
  feature: {
    referenceTableName: "feature_content",
    referenceId: "feature_id",
  },
  material: {
    referenceTableName: "material_content",
    referenceId: "material_id",
  },
  collar: {
    referenceTableName: "collar_content",
    referenceId: "collar_id",
  },
  offer: {
    referenceTableName: "offer_content",
    referenceId: "offer_id",
  },
  pattern: {
    referenceTableName: "pattern_content",
    referenceId: "pattern_id",
  },
};

export const getTableContentName = (table) => {
  console.log(table);
  return tables?.[table];
};
