const express = require("express");
const router = express.Router({ mergeParams: true });

const Post = require("../models/Post");

router.get("/", async (req, res) => {
  Post.find()
    .cache()
    .then((result) => res.send(result))
    .catch((err) => console.error(err));
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  Post.findOne({ _id: id })
    .cache()
    .then((result) => res.send(result))
    .catch((err) => console.error(err));
});

router.post("/", async (req, res) => {
  Post.create(req.body)
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  Post.findOneAndDelete({ _id: id })
    .cache({ delete: true })
    .then((result) => res.send(result))
    .catch((err) => console.error(err));
});

// Używać z rozwagą (usuwa wszystko)
router.delete("/", async (req, res) => {
  Post.deleteMany()
    .cache({ delete: true })
    .then((result) => res.send(result))
    .catch((err) => console.error(err));
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  Post.findOneAndUpdate({ _id: id }, req.body)
    .then((result) => res.send(result))
    .catch((err) => console.error(err));
});

module.exports = router;
