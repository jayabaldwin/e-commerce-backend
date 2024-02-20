const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint
// SUCCESSFUL TEST
router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tag = await Tag.findAll({
      include: [Product],
    });
    res.json(tag)
  } catch (error) {
    res.status(500).json(error.message);
  }
});

// SUCCESSFUL TEST
router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tag = await Tag.findByPk(req.params.id, {
      include: Product,
    });
    res.json(tag);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

// // SUCCESSFUL TEST
router.post('/', async (req, res) => {
  // create a new tag
  try {
    const tag = await Tag.create(req.body);
    res.status(201).end();
  } catch (error) {
    res.status(500).json(error.message);
  }
});


router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;