const express = require("express");
const { getAllCandidates, handleEditCandidate, updateCandidateStatus, getAllEmployees,getPositionsDropdown, getCandidateData } = require("../controllers/candidate")
const upload = require('../utils/multer');
const Candidate = require('../models/candidate');

const router = express.Router();

router.post('/', upload.single('resume'), async (req, res) => {
  try {
    const { fullName, email, phoneNumber, experience, position, createdBy } = req.body;
    console.log("pathhhh", req.file.path)
    const newCandidate = new Candidate({
      fullName,
      email,
      phoneNumber,
      experience,
      position,
      resume: req.file.path,
      createdBy


    });

    await newCandidate.save();

    res.status(201).json({ message: 'File uploaded successfully', candidate: newCandidate });
  } catch (err) {
    res.status(500).json({ message: 'Upload failed', error: err.message });
  }
});

router.get('/list', getAllCandidates)
router.get('/positionslist', getPositionsDropdown)
router.get('/employees/list', getAllEmployees)
router.get('/:candidateId', getCandidateData)
router.put('/:candidateId', handleEditCandidate)
router.patch('/updatestatus/:candidateId', updateCandidateStatus)
router.delete('/:id', async (req, res) => {
  try {
    await Candidate.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting candidate' });
  }
});


module.exports = router;