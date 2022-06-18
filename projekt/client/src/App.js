import "./App.css";
import { Formik } from "formik";
import axios from "axios";
import React, { useState, useEffect } from "react";

function App() {
  const [posts, setPosts] = useState([]);
  const [edit, setEdit] = useState(false);
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  };
  useEffect(() => {
    axios
      .get("/api/posts", { headers })
      .then((res) => {
        setPosts(res.data);
        console.log(res.data);
      })
      .catch((err) => console.error(err));
  }, []);
  function DeletePost(id) {
    axios
      .delete(`/api/posts/${id}`, { headers })
      .then((res) => {
        console.log(res);
        setPosts(posts.filter((post) => post._id !== id));
      })
      .catch((err) => console.error(err));
  }

  function EditPost(id, post) {
    setEdit(id);
  }
  return (
    <div className="App">
      <Formik
        initialValues={{ text: "" }}
        onSubmit={(values) => {
          console.log(values);
          axios.post("/api/posts", values, { headers }).then((response) => {
            console.log(response);
            setPosts([...posts, response.data]);
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
            <button onClick={() => EditPost(post._id)}>Edit</button>
            {edit === post._id ? (
              <div>
                <Formik
                  initialValues={{ text: post.text }}
                  onSubmit={(values) => {
                    axios
                      .put(`/api/posts/${post._id}`, values, {
                        headers,
                      })
                      .then((res) => {
                        console.log(res);
                        setPosts(
                          posts.map((post) =>
                            post._id === res.data._id
                              ? { text: values.text }
                              : post
                          )
                        );
                      })
                      .catch((err) => console.error(err));
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
              </div>
            ) : null}
            <button onClick={() => DeletePost(post._id)}>Usun</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
