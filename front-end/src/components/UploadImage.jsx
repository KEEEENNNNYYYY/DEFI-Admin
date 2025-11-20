import React, { useState } from "react";
import axios from "axios";

function UploadImage({ onUpload }) {
    const [preview, setPreview] = useState(null);
    const [uploading, setUploading] = useState(false);

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setPreview(URL.createObjectURL(file));

        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "react_upload"); 

        setUploading(true);
        try {
            const res = await axios.post(
                "https://api.cloudinary.com/v1_1/dyjrnhldt/image/upload",
                formData
            );

            console.log("Upload réussi:", res.data);

            
            onUpload({
                imageUrl: res.data.secure_url,
                publicId: res.data.public_id
            });

            setPreview(res.data.secure_url);

        } catch (err) {
            console.error("Upload failed:", err.response?.data || err.message);
            onUpload({ imageUrl: "", publicId: "" });
        } finally {
            setUploading(false);
        }
    };

    return (
        <div>
            <input type="file" accept="image/*" onChange={handleFileChange} />
            {preview && <img src={preview} alt="preview" style={{ maxWidth: "200px" }} />}
            {uploading && <p>Upload en cours...</p>}
        </div>
    );
}

export default UploadImage;
