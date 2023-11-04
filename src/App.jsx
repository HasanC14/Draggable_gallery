import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faImage, faTrash } from "@fortawesome/free-solid-svg-icons";
import "./App.css";
import { useState } from "react";

function App() {
  const [selectedImages, setSelectedImages] = useState([]);
  const [imageFileNames, setImageFileNames] = useState([
    "image-1.webp",
    "image-2.webp",
    "image-3.webp",
    "image-4.webp",
    "image-5.webp",
    "image-6.webp",
    "image-7.webp",
    "image-8.webp",
    "image-9.webp",
    "image-10.jpeg",
    "image-11.jpeg",
  ]);

  const toggleImageSelection = (index) => {
    const isSelected = selectedImages.includes(index);
    if (isSelected) {
      setSelectedImages(selectedImages.filter((i) => i !== index));
    } else {
      setSelectedImages([...selectedImages, index]);
    }
  };

  const deleteSelectedImages = () => {
    const updatedImages = imageFileNames.filter(
      (_, index) => !selectedImages.includes(index)
    );
    setSelectedImages([]);
    setImageFileNames(updatedImages); // Update the state with the new list of images after deleting
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-gray-200 p-4 rounded-md">
        <div className="text-2xl  border-b-2 border-gray-500 my-4 pb-4">
          Gallary
        </div>
        <div className="grid grid-cols-5 gap-4 max-w-5xl mx-auto ">
          {imageFileNames.map((imageName, index) => (
            <div
              key={index}
              className={`relative rounded-md border  ${
                index === 0 ? "col-span-2 row-span-2" : ""
              }`}
            >
              <img
                src={`../Assets/${imageName}`}
                alt={`Image ${index}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black opacity-0 hover:opacity-50 transition-opacity flex items-start">
                <button
                  className={`absolute top-0 left-0 p-2 ${
                    selectedImages.includes(index)
                      ? "selected-image"
                      : "bg-white"
                  }`}
                  onClick={() => toggleImageSelection(index)}
                >
                  <FontAwesomeIcon icon={faCheck} />
                </button>
              </div>
            </div>
          ))}

          {/* Add Image Section */}
          <div className="">
            <div className="rounded-md border-dashed border-gray-400 border bg-gray-100 p-4 flex justify-center items-center h-full">
              <div className="flex justify-center items-center flex-col space-y-4">
                <FontAwesomeIcon icon={faImage} />
                <div>Add Images</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Button */}
      {selectedImages.length > 0 && (
        <div className="fixed bottom-4 right-4">
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={deleteSelectedImages}
          >
            <FontAwesomeIcon icon={faTrash} />
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
