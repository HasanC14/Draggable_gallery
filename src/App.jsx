import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faImage, faTrash } from "@fortawesome/free-solid-svg-icons";
import "./App.css";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useState } from "react";

function App() {
  const [selectedImages, setSelectedImages] = useState([]);
  const [imageFileNames, setImageFileNames] = useState([
    { id: "1", name: "image-1.webp" },
    { id: "2", name: "image-2.webp" },
    { id: "3", name: "image-3.webp" },
    { id: "4", name: "image-4.webp" },
    { id: "5", name: "image-5.webp" },
    { id: "6", name: "image-6.webp" },
    { id: "7", name: "image-7.webp" },
    { id: "8", name: "image-8.webp" },
    { id: "9", name: "image-9.webp" },
    { id: "10", name: "image-10.jpeg" },
    { id: "11", name: "image-11.jpeg" },
  ]);

  const toggleImageSelection = (id) => {
    const isSelected = selectedImages.includes(id);
    if (isSelected) {
      setSelectedImages(selectedImages.filter((i) => i !== id));
    } else {
      setSelectedImages([...selectedImages, id]);
    }
  };

  const deleteSelectedImages = () => {
    const updatedImages = imageFileNames.filter(
      (image) => !selectedImages.includes(image.id)
    );
    setSelectedImages([]);
    setImageFileNames(updatedImages);
  };

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(imageFileNames);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setImageFileNames(items);
  };
  const toggleSelectAll = () => {
    if (selectedImages.length === imageFileNames.length) {
      setSelectedImages([]);
    } else {
      setSelectedImages(imageFileNames.map((image) => image.id));
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200">
      <div className="p-4 rounded-md bg-white">
        <div className="flex justify-between md:items-center items-start md:space-y-0 space-y-4 border-b-2 border-gray-500 my-4 pb-4 md:flex-row flex-col">
          {selectedImages.length > 0 ? (
            <div className="flex space-x-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedImages.length === imageFileNames.length}
                  onChange={toggleSelectAll}
                />
                {/* <div className="text-2xl ml-2">Select All</div> */}
              </div>
              <div className="text-2xl">{selectedImages.length} Selected</div>
            </div>
          ) : (
            <div className="text-2xl">Gallery</div>
          )}
          <div>
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
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="images">
            {(provided) => (
              <div
                className="grid md:grid-cols-5 grid-cols-4 md:grid-rows-3 grid-rows-4 gap-4 max-w-5xl mx-auto "
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {imageFileNames.map((image, index) => {
                  return (
                    <Draggable
                      key={image.id.toString()} // Use the unique ID as the key
                      draggableId={image.id.toString()} // Use the unique ID as the draggableId
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
                            src={`/assets/${image.name}`}
                            alt={`Image ${image.id}`}
                            className="w-full h-full object-fill"
                          />
                          {selectedImages.includes(image.id) && (
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
                              onClick={() => toggleImageSelection(image.id)}
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
