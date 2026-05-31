const express = require('express');
const router = express.Router();
const Collaboration = require('../models/Collaboration');

// SEND COLLABORATION REQUEST
router.post('/send', async (req, res) => {
  try {
    const { senderNGO, receiverNGO, message } = req.body;

    // Check if request already exists
    const existing = await Collaboration.findOne({ senderNGO, receiverNGO });
    if (existing) {
      return res.status(400).json({ message: 'Collaboration request already sent!' });
    }

    const collaboration = new Collaboration({
      senderNGO,
      receiverNGO,
      message
    });

    await collaboration.save();
    res.status(201).json({ message: 'Collaboration request sent successfully!', collaboration });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// GET ALL REQUESTS FOR AN NGO (incoming requests)
router.get('/requests/:ngoId', async (req, res) => {
  try {
    const requests = await Collaboration.find({ 
      receiverNGO: req.params.ngoId 
    }).populate('senderNGO', 'name location category');
    
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// GET ALL SENT REQUESTS BY AN NGO
router.get('/sent/:ngoId', async (req, res) => {
  try {
    const requests = await Collaboration.find({ 
      senderNGO: req.params.ngoId 
    }).populate('receiverNGO', 'name location category');
    
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// ACCEPT REQUEST
router.put('/accept/:id', async (req, res) => {
  try {
    const collaboration = await Collaboration.findByIdAndUpdate(
      req.params.id,
      { status: 'accepted' },
      { new: true }
    );
    res.json({ message: 'Collaboration accepted!', collaboration });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// REJECT REQUEST
router.put('/reject/:id', async (req, res) => {
  try {
    const collaboration = await Collaboration.findByIdAndUpdate(
      req.params.id,
      { status: 'rejected' },
      { new: true }
    );
    res.json({ message: 'Collaboration rejected!', collaboration });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router;