import axios from "axios";

export const uploadImage = async (imageFile) => {
  const formData = new FormData();
  formData.append("file", imageFile);
  formData.append("upload_preset", "HotelRooms");

  try {
    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/dx457iqpi/image/upload",
      formData
    );
    return response.data.secure_url; // 🔹 URL return kare che
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    return null;
  }
};
