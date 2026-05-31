const express = require('express');
const router = express.Router();
const NGO = require('../models/NGO');

// CREATE NGO
router.post('/create', async (req, res) => {
  try {
    const { name, description, category, location, contact, mission, createdBy } = req.body;

    const ngo = new NGO({
      name,
      description,
      category,
      location,
      contact,
      mission,
      createdBy
    });

    await ngo.save();
    res.status(201).json({ message: 'NGO created successfully', ngo });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// GET ALL NGOs
router.get('/', async (req, res) => {
  try {
    const ngos = await NGO.find();
    res.json(ngos);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// GET SINGLE NGO
router.get('/:id', async (req, res) => {
  try {
    const ngo = await NGO.findById(req.params.id);
    if (!ngo) {
      return res.status(404).json({ message: 'NGO not found' });
    }
    res.json(ngo);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// UPDATE NGO
router.put('/:id', async (req, res) => {
  try {
    const ngo = await NGO.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!ngo) {
      return res.status(404).json({ message: 'NGO not found' });
    }
    res.json({ message: 'NGO updated successfully', ngo });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// DELETE NGO
router.delete('/:id', async (req, res) => {
  try {
    const ngo = await NGO.findByIdAndDelete(req.params.id);
    if (!ngo) {
      return res.status(404).json({ message: 'NGO not found' });
    }
    res.json({ message: 'NGO deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router;