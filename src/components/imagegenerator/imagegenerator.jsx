import React, { useRef, useState } from 'react';
import "./imagegenerator.css"; // Ensure this file contains the required CSS styles
import default_image from '../assets/default_image.svg'; // Default image when no image is generated

function Imagegenerator() {
    const [image_url, setImage_url] = useState("/"); // State to store the image URL
    const [loading, setLoading] = useState(false); // State to manage the loading status
    let inputRef = useRef(null); // Reference for the input field

    // Function to handle image generation
    const imageGenerator = async () => {
        const query = inputRef.current.value || 'apples'; // Use input value or default to 'apples'
        if (query === "") {
            alert("Please enter a prompt!");
            return;
        }

        setLoading(true); // Set loading to true when the fetch request starts
        try {
            const response = await fetch(`https://lexica.art/api/v1/search?q=${query}`);
            const data = await response.json(); // Parse JSON response

            if (data && data.images && data.images.length > 0) {
                // If images are found, set the first image URL
                setImage_url(data.images[1].src);
            } else {
                alert("No images found. Please try again with a different prompt.");
            }
        } catch (error) {
            console.error("Error fetching image:", error);
            alert("An error occurred while fetching the image. Please try again.");
        } finally {
            setLoading(false); // Set loading to false when the request is completed
        }
    };

    return (
        <div className='ai-image-generator'>
            <div className='header'>AI Image<span>Generator</span></div>
            <div className="img-loading">
                <div className="image">
                    {/* Display the image or default image if URL is not available */}
                    <img src={image_url === "/" ? default_image : image_url} alt="Generated or default" />
                </div>
                {/* Show the loading spinner if loading is true */}
                {loading && (
                    <div className="loading-spinner"></div>
                )}
                <div className="search-box">
                    <input 
                        ref={inputRef} 
                        className='search-input' 
                        type="text" 
                        placeholder="Enter your prompt" 
                    />
                    <div className="generate-btn" onClick={imageGenerator}>Generate</div>
                </div>
            </div>
        </div>
    );
}

export default Imagegenerator;
