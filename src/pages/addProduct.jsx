import React, { useState } from "react";
import "./css/addProduct.css";
import axios from "axios";
import { toast } from "react-toastify";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [videoUrl, setVideoUrl] = useState("");
  let [oldPrice, setOldPrice] = useState("");
  let [newPrice, setNewPrice] = useState("");
  const [chip, setChip] = useState("");
  let [ram, setRam] = useState("");
  let [rom, setRom] = useState("");
  const [screen, setScreen] = useState("");
  let [pin, setPin] = useState("");
  const [selfieCam, setSelfieCam] = useState("");
  const [behindCam, setBehindCam] = useState("");
  let [chargeSpeed, setChargeSpeed] = useState("");
  const [slug, setSlug] = useState("");
  let [quantity, setQuantity] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Logic to submit the product data to the server
    // This can involve API calls, etc.

    oldPrice = parseInt(oldPrice);
    newPrice = parseInt(newPrice);
    ram = parseInt(ram);
    rom = parseInt(rom);
    pin = parseInt(pin);
    chargeSpeed = parseInt(chargeSpeed);
    quantity = parseInt(quantity);

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);

    await axios
      .post("http://localhost:1406/admin/new-product", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
        toast.success("Add product successfully");
        setName("");
        setCategory("");
        setImageUrl(null);
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
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error creating product");
      });
  };

  return (
    <div className="dashboard-container">
      <div className="add-product-container">
        <h2>Add Product</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              value={name}
              name="name"
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label>
            Category:
            <input
              type="text"
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </label>
          <label>
            Image URL:
            <input
              type="file"
              name="image"
              onChange={(e) => setImageUrl(e.target.files[0])}
            />
          </label>
          <label>
            Video URL:
            <input
              type="text"
              name="videoUrl"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
            />
          </label>
          <label>
            Old Price:
            <input
              type="text"
              name="oldPrice"
              value={oldPrice}
              onChange={(e) => setOldPrice(e.target.value)}
            />
          </label>
          <label>
            New Price:
            <input
              type="text"
              name="newPrice"
              value={newPrice}
              onChange={(e) => setNewPrice(e.target.value)}
            />
          </label>
          <label>
            Chip:
            <input
              type="text"
              name="chip"
              value={chip}
              onChange={(e) => setChip(e.target.value)}
            />
          </label>
          <label>
            RAM:
            <input
              type="text"
              name="ram"
              value={ram}
              onChange={(e) => setRam(e.target.value)}
            />
          </label>
          <label>
            ROM:
            <input
              type="text"
              name="rom"
              value={rom}
              onChange={(e) => setRom(e.target.value)}
            />
          </label>
          <label>
            Screen:
            <input
              type="text"
              name="screen"
              value={screen}
              onChange={(e) => setScreen(e.target.value)}
            />
          </label>
          <label>
            Pin:
            <input
              type="text"
              name="pin"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
            />
          </label>
          <label>
            Selfie Camera:
            <input
              type="text"
              name="selfieCam"
              value={selfieCam}
              onChange={(e) => setSelfieCam(e.target.value)}
            />
          </label>
          <label>
            Behind Camera:
            <input
              type="text"
              name="behindCam"
              value={behindCam}
              onChange={(e) => setBehindCam(e.target.value)}
            />
          </label>
          <label>
            Charge Speed:
            <input
              type="text"
              name="chargeSpeed"
              value={chargeSpeed}
              onChange={(e) => setChargeSpeed(e.target.value)}
            />
          </label>
          <label>
            Slug:
            <input
              type="text"
              name="slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
            />
          </label>
          <label>
            Quantity:
            <input
              type="text"
              name="quantity"
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
