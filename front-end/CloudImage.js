// src/components/CloudImage.js
import React from "react";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";

const cld = new Cloudinary({
    cloud: {
        cloudName: "dyjrnhldt"
    }
});

function CloudImage({ publicId }) {
    const myImage = cld.image(publicId); // Exemple: 'sample.jpg'

    return <AdvancedImage cldImg={myImage} />;
}

export default CloudImage;