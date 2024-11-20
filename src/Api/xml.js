import { toast } from "react-toastify";
import axios from "axios";

export async function XMLgetTemplateFields(url) {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_KADINLE_XML}/api/v4?url=${url}`
    ).then((res) => res.json());
    return response;
  } catch (error) {
    toast.error("Error creating XML file.", error);
  }
}

export async function XMLCreateFile(data) {
  console.log("🚀 ~ XMLCreateFile ~ data:", data);
  try {
    const response = await fetch(
      `${process.env.REACT_APP_KADINLE_XML}/api/v4`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(data),
      }
    ).then((res) => res.json());
    return response;
  } catch (error) {
    toast.error("Error creating XML file.", error);
  }
}
export async function XMLGetValuesToMap(id) {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_KADINLE_XML}/api/v4/values/${id}`
    ).then((res) => res.json());
    return response;
  } catch (error) {
    toast.error("Error creating XML file.", error);
  }
}
