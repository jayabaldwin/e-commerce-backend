const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

// SUCCESSFUL TEST
router.get("/", async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categories = await Category.findAll({
      include: [Product],
    });
    res.json(categories);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

// SUCCESSFUL TEST
router.get("/:id", async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categories = await Category.findByPk(req.params.id, {
      include: [Product],
    });
    res.json(categories);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

// SUCCESSFUL TEST
router.post("/", async (req, res) => {
  // create a new category
  try {
    const categories = await Category.create(req.body);
    res.status(201).end();
  } catch (error) {
    res.status(500).json(error.message);
  }
});


// UNTESTED
router.put("/:id", async (req, res) => {
  // Update a category by its `id` value
  try {
    const categories = await Category.update(req.body, {
      where: { id: req.params.id },
    });
    if (!categories[0]) {
      res.status(404).json({ message: "No category with this id!" });
      return;
    }
    res.json(categories);
  } catch (error) {
    res.status(500).json(error.message);
  }
});


// SUCCESSFUL TEST
router.delete("/:id", async (req, res) => {
  // Delete a category by its `id` value
  try {
    const categories = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json(error.message);
  }
});



// router.put("/:id", (req, res) => {
//   // update a category by its `id` value
//   Category.update(req.body, { where: { id: req.params.id } })
//     .then((category) => {
//       res.json(category);
//     })
//     .catch((error) => {
//       res.status(500).json(error.message);
//     });
// });



module.exports = router;