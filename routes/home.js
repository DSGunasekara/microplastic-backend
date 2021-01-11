const router = require("express").Router();
const Graph = require("../model/Graph");

router.get("/", async (req, res) => {
  try {
    const graphs = await Graph.find({});
    return res.status(200).send(graphs);
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const graph = await Graph.findById(req.params.id);
    if (!graph) return res.status(404).send("No graph found");
    return res.status(200).send(graph);
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const graph = new Graph({ ...req.body });
    await graph.save((error, _) => {
      if (error) {
        console.log(error);
        return res.status(400).send(error);
      }
      return res.status(201).send(graph);
    });
    return res.status(200).send(req.body);
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const graph = await Graph.findOne({ _id: req.params.id });
    if (!graph) return res.status(404).send("Graph does not exits");

    // await graph.updateOne({ _id: req.params.id }, req.body);
    graph.location = req.body.location;
    console.log(graph);
    await graph.save()
    return res.status(200).send("Graph updated");
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const graph = await Graph.findOne({ _id: req.params.id });
    if (!graph) return res.status(404).send("Graph does not exits");
    await graph.delete((error, _) => {
      if (error) return res.status(400).send(error);
      return res.status(200).send("Graph removed");
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

module.exports = router;
