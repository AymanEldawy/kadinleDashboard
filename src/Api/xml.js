import { toast } from "react-toastify";
import axios from "axios";

export async function XMLCreateTemplate(url) {
    console.log('called', url);
    
  console.log('---------',process.env.REACT_APP_KADINLE_XML);

  try {
    const response = await axios.get(
      `https://xml.kadinle.com/api/v4?url=${url}`
    );
    console.log("response from server", response);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    if (response.status === 201) {
    } else {
      toast.error("Error creating XML file.");
    }
  } catch (error) {
    toast.error("Error creating XML file.");
  }
}
