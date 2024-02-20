const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // Find all tags and include its associated Product data
  try {
    const tag = await Tag.findAll({
      include: [Product],
    });
    res.json(tag)
  } catch (error) {
    res.status(500).json(error.message);
  }
});


router.get('/:id', async (req, res) => {
  // Find a single tag by its `id` and include its associated Product data
  try {
    const tag = await Tag.findByPk(req.params.id, {
      include: Product,
    });
    res.json(tag);
  } catch (error) {
    res.status(500).json(error.message);
  }
});


// Do I need to return a body for this?
router.post('/', async (req, res) => {
  // Create a new tag
  try {
    const tag = await Tag.create(req.body);
    res.status(201).end();
  } catch (error) {
    res.status(500).json(error.message);
  }
});


router.put('/:id', async (req, res) => {
  // Update a tag's name by its `id` value
  try {
    const tag = await Tag.update(req.body, {
      where: { id: req.params.id },
    });
    res.json(tag);
  } catch (error) {
    res.status(500).json(error.message);
  };
});


router.delete('/:id', async (req, res) => {
  // Delete on tag by its `id` value
  try {
    const tag = await Tag.destroy({
      where: {
        id: req.params.id
      },
    });
    res.status(200).json(tag);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

module.exports = router;