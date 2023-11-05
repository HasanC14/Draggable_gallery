import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faImage, faTrash } from "@fortawesome/free-solid-svg-icons";
import "./App.css";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
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
    setImageFileNames(updatedImages);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200">
      <div className=" p-4 rounded-md bg-white">
        <div className="flex justify-between items-center border-b-2 border-gray-500 my-4 pb-4">
          {selectedImages.length > 0 ? (
            <div className="text-2xl">{selectedImages.length} Selected</div>
          ) : (
            <div className="text-2xl">Gallery</div>
          )}
          <div>
            {/* Delete Button */}
            {selectedImages.length > 0 && (
              <div>
                <button
                  className="bg-gray-400 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                  onClick={deleteSelectedImages}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            )}
          </div>
        </div>
        <DragDropContext>
          <Droppable droppableId="images">
            {(provided) => (
              <div
                className="grid grid-cols-5 grid-rows-3 gap-4 max-w-5xl mx-auto "
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {imageFileNames.map((imageName, index) => {
                  return (
                    <Draggable
                      key={index}
                      draggableId={imageName}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          className={`relative rounded-md border  ${
                            index === 0 ? "col-span-2 row-span-2" : ""
                          }`}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <img
                            src={`../Assets/${imageName}`}
                            alt={`Image ${index}`}
                            className="w-full h-full object-cover"
                          />
                          {selectedImages.includes(index) && (
                            <div className="selected-overlay">
                              <FontAwesomeIcon
                                icon={faCheck}
                                className="text-gray-500 text-4xl"
                              />
                            </div>
                          )}
                          <div className="absolute inset-0 bg-black opacity-0 hover:opacity-50 transition-opacity flex items-start">
                            <button
                              className="absolute top-0 left-0 p-2 bg-white"
                              onClick={() => toggleImageSelection(index)}
                            >
                              <FontAwesomeIcon icon={faCheck} />
                            </button>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
                <div className="">
                  <div className="rounded-md border-dashed border-gray-400 border bg-gray-100 p-4 flex justify-center items-center h-full">
                    <div className="flex justify-center items-center flex-col space-y-4">
                      <FontAwesomeIcon icon={faImage} />
                      <div>Add Images</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
}

export default App;
