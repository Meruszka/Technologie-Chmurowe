import "./App.css";
import { Formik } from "formik";
import axios from "axios";
import React, { useState, useEffect } from "react";

function App() {
  const [posts, setPosts] = useState([]);
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  };
  useEffect(() => {
    axios
      .get("http://localhost:5000/posts", { headers })
      .then((res) => setPosts(res.data))
      .catch((err) => console.error(err));
  }, []);
  return (
    <div className="App">
      <Formik
        initialValues={{ text: "" }}
        onSubmit={(values) => {
          console.log(values);
          axios
            .post("http://localhost:5000/posts", values, { headers })
            .then((response) => {
              console.log(response);
            });
        }}
      >
        {({ values, handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="text"
              onChange={handleChange}
              value={values.text}
            />
            <button type="submit">Submit</button>
          </form>
        )}
      </Formik>

      <div>
        <h1>Posts</h1>
        {posts.map((post) => (
          <div key={post._id}>
            <h2>{post.text}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
