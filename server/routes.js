const express = require ('express');
const router = express.Router();
const { getConnectedClient } = require("./database");

const getCollection = () => {
    const client = getConnectedClient();
    const collection = client.db("todosdb").collection("todos");
    return collection;
}

// GET Mapping

router.get("/todos", async (req, res) => {
    const collection = getCollection();
    const todos = await collection.find({}).toArray();


    res.status(200).json(todos);
});

// POST Mapping

router.post("/todos", async (req, res) => {
    const collection = getCollection();
    const {todo} = req.body;

    const newTodo = await collection.insertOne({todo, status:false})

    res.status(201).json({ todo, status:false, _id:newTodo.insertedId});
});

// DELETE Mapping

router.delete("/todos/:id", (req, res) => {
    res.status(200).json({msg:"DELETE REQUEST TO /api/todos/:id"});
});

// PUT Mapping

router.put("/todos/:id", (req, res) => {
    res.status(200).json({msg:"PUT REQUEST TO /api/todos/:id"});
});

module.exports = router;
