import React, { useState, useEffect } from "react";
import RoomDrawer from "@/components/RoomDrawer";

const RoomOrganizer = () => {
  const [roomDimensions, setRoomDimensions] = useState({ width: 0, height: 0 });
  const [selectedFurniture, setSelectedFurniture] = useState(null);
  const [addedFurniture, setAddedFurniture] = useState([]);
  const [arrengedFurniture, setArrengedFurniture] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleRoomSubmit = (e) => {
    e.preventDefault();
    const { width, height } = e.target.elements;
    setRoomDimensions({
      width: parseFloat(width.value),
      height: parseFloat(height.value),
    });
  };

  const handleFurnitureSubmit = (e) => {
    e.preventDefault();
    const { width, height } = e.target.elements;
    const furnitureDimensions = {
      width: parseFloat(width.value),
      height: parseFloat(height.value),
    };
    handleAddToFurnitureList(furnitureDimensions);
  };

  const handleSelection = (furnitureType) => {
    setSelectedFurniture((prev) =>
      prev === furnitureType ? null : furnitureType
    );
  };

  const handleAddToFurnitureList = (dimensions) => {
    if (selectedFurniture) {
      setAddedFurniture((prevFurniture) => [
        ...prevFurniture,
        { type: selectedFurniture, dimensions },
      ]);
      setSelectedFurniture(null);
    }
  };

  const handleRemoveFurniture = (index) => {
    setAddedFurniture((prevFurniture) => [
      ...prevFurniture.slice(0, index),
      ...prevFurniture.slice(index + 1),
    ]);
  };

  const renderAddedFurniture = () => {
    if (addedFurniture.length === 0) {
      return <>&nbsp;</>;
    }

    return (
      <div>
        <h2 className="uppercase text-sm font-bold">Added Furniture</h2>
        <ul>
          {addedFurniture.map((item, index) => (
            <li key={index} className="flex items-center justify-between mt-2">
              <div>{`${item.type.toUpperCase()} - ${item.dimensions.width}m x ${
                item.dimensions.height
              }m`}</div>
              <button
                className="bg-red-500 text-white rounded p-1"
                onClick={() => handleRemoveFurniture(index)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const handleOrganizeRoom = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(
        "https://spacejammer-1-m8128562.deta.app/jamit",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            dims: [roomDimensions.width, roomDimensions.height],
            furniture: addedFurniture.map((f) => [
              f.dimensions.width,
              f.dimensions.height,
            ]),
            muebles: addedFurniture.map((f) => f.type),
          }),
        }
      );

      const data = await response.json();
      setArrengedFurniture(data.coords);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1 className="uppercase text-sm font-bold">Room Organizer</h1>
      <p>Enter the dimensions of your room (meters)</p>
      <form onSubmit={handleRoomSubmit}>
        {["Width", "Height"].map((type) => (
          <input
            key={type}
            type="number"
            step="0.01"
            placeholder={type}
            name={type.toLowerCase()}
            className="border-solid border-main border-2 rounded p-1 px-3 w-40 mt-2 mr-2"
            required
          />
        ))}
        <button type="submit" className="bg-main text-white rounded p-2 mt-3">
          Draw my room
        </button>
      </form>

      {roomDimensions.width > 0 && roomDimensions.height > 0 && (
        <div className="bg-main rounded p-3 text-white mt-3">
          <b>Add furniture</b>
          <div className="flex flex-row items-center mt-3">
            {["bed", "closet", "desktop", "chair", "nightstand", "sofa"].map(
              (furnitureType) => (
                <button
                  key={furnitureType}
                  className={`p-2 mr-2 bg-white min-h-32 rounded ${
                    selectedFurniture === furnitureType ? "bg-gray-300" : ""
                  }`}
                  onClick={() => handleSelection(furnitureType)}
                >
                  <img
                    src={`/furniture/${furnitureType}.svg`}
                    alt={furnitureType}
                    width="80"
                    height="80"
                  />
                </button>
              )
            )}
          </div>
          {selectedFurniture && (
            <div className="mt-3">
              <span className="text-sm">
                Selected <b>{selectedFurniture}</b>.
              </span>
              <div className="mt-2">
                <p>Enter dimensions (meters):</p>
                <form onSubmit={handleFurnitureSubmit}>
                  {["Width", "Height"].map((type) => (
                    <input
                      key={type}
                      type="number"
                      step="0.01"
                      placeholder={type}
                      name={type.toLowerCase()}
                      className="border-solid text-black border-main border-2 rounded p-1 px-3 w-40 m-2"
                      required
                    />
                  ))}
                  <button
                    className="bg-secondary text-white rounded p-2 mt-2"
                    type="submit"
                  >
                    Add to room
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
      <div className="mt-5">{renderAddedFurniture()}</div>
      {addedFurniture.length > 0 && (
        <button
          onClick={handleOrganizeRoom}
          className={`bg-main text-white rounded p-2 mt-3 ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isLoading}
        >
          {isLoading ? "Organizing..." : "Organize my room"}
        </button>
      )}
      {roomDimensions.width > 0 && (
        <>
        <RoomDrawer
          width={roomDimensions.width}
          height={roomDimensions.height}
          furniture={arrengedFurniture.map((f) => ({
            svg: `/furniture/${f[2]}.svg`,
            x: f[0],
            y: f[1],
            width: 1,
            height: 1,
          }))}
        />
        
        </>
      )}
    </div>
  );
};

export default RoomOrganizer;
