import React, { useState } from "react";
import "./css/addProduct.css";

const AddProduct = () => {
  const [category, setCategory] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [oldPrice, setOldPrice] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [chip, setChip] = useState("");
  const [ram, setRam] = useState("");
  const [rom, setRom] = useState("");
  const [screen, setScreen] = useState("");
  const [pin, setPin] = useState("");
  const [selfieCam, setSelfieCam] = useState("");
  const [behindCam, setBehindCam] = useState("");
  const [chargeSpeed, setChargeSpeed] = useState("");
  const [slug, setSlug] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Logic to submit the product data to the server
    // This can involve API calls, etc.
    console.log("Product submitted:", {
      category,
      imageUrl,
      videoUrl,
      oldPrice,
      newPrice,
      chip,
      ram,
      rom,
      screen,
      pin,
      selfieCam,
      behindCam,
      chargeSpeed,
      slug,
      quantity,
    });
    // Clearing form fields after submission
    setCategory("");
    setImageUrl("");
    setVideoUrl("");
    setOldPrice("");
    setNewPrice("");
    setChip("");
    setRam("");
    setRom("");
    setScreen("");
    setPin("");
    setSelfieCam("");
    setBehindCam("");
    setChargeSpeed("");
    setSlug("");
    setQuantity("");
  };

  return (
    <div className="dashboard-container">
      <div className="add-product-container">
        <h2>Add Product</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Category:
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </label>
          <label>
            Image URL:
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </label>
          <label>
            Video URL:
            <input
              type="text"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
            />
          </label>
          <label>
            Old Price:
            <input
              type="text"
              value={oldPrice}
              onChange={(e) => setOldPrice(e.target.value)}
            />
          </label>
          <label>
            New Price:
            <input
              type="text"
              value={newPrice}
              onChange={(e) => setNewPrice(e.target.value)}
            />
          </label>
          <label>
            Chip:
            <input
              type="text"
              value={chip}
              onChange={(e) => setChip(e.target.value)}
            />
          </label>
          <label>
            RAM:
            <input
              type="text"
              value={ram}
              onChange={(e) => setRam(e.target.value)}
            />
          </label>
          <label>
            ROM:
            <input
              type="text"
              value={rom}
              onChange={(e) => setRom(e.target.value)}
            />
          </label>
          <label>
            Screen:
            <input
              type="text"
              value={screen}
              onChange={(e) => setScreen(e.target.value)}
            />
          </label>
          <label>
            Pin:
            <input
              type="text"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
            />
          </label>
          <label>
            Selfie Camera:
            <input
              type="text"
              value={selfieCam}
              onChange={(e) => setSelfieCam(e.target.value)}
            />
          </label>
          <label>
            Behind Camera:
            <input
              type="text"
              value={behindCam}
              onChange={(e) => setBehindCam(e.target.value)}
            />
          </label>
          <label>
            Charge Speed:
            <input
              type="text"
              value={chargeSpeed}
              onChange={(e) => setChargeSpeed(e.target.value)}
            />
          </label>
          <label>
            Slug:
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
            />
          </label>
          <label>
            Quantity:
            <input
              type="text"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
