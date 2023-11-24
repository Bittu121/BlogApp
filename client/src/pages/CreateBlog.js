import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./CreateBlog.css";
import toast from "react-hot-toast";
const CreateBlog = () => {
  const id = localStorage.getItem("userId");
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    image: "",
  });
  // input change
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  //form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/blog/create-blog", {
        title: inputs.title,
        description: inputs.description,
        image: inputs.image,
        user: id,
      });
      if (data?.success) {
        toast.success("Blog Created");
        navigate("/my-blogs");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="container">
        <h2>Create A Posts</h2>
        <form className="form-groups" onSubmit={handleSubmit}>
          <label htmlFor="username">Title</label>
          <input
            type="text"
            id="username"
            name="title"
            required
            value={inputs.title}
            onChange={handleChange}
          />
          <label htmlFor="username">Description</label>
          <input
            type="text"
            id="username"
            name="description"
            requiredvalue={inputs.description}
            onChange={handleChange}
          />
          <label htmlFor="username">Image URL</label>
          <input
            type="text"
            id="username"
            name="image"
            requiredvalue={inputs.image}
            onChange={handleChange}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
};

export default CreateBlog;
