const express = require("express");
const { getAllLeaves, updateLeaveStatus, getLeavesGroupedByDate } = require("../controllers/leave")
const upload = require('../utils/multer');
const Candidate = require('../models/leave');

const router = express.Router();

router.post('/', upload.single('doc'), async (req, res) => {
  try {
    const { fullName, designation, leaveDate, reason, markedBy, employee } = req.body;
    console.log("pathhhh", req.file.path)
    const newLeave = new Candidate({
      fullName,
      designation,
      leaveDate,
      reason,
      markedBy,
      doc: req.file.path,
      employee


    });

    await newLeave.save();

    res.status(201).json({ message: 'Leave applied successfully', leave: newLeave });
  } catch (err) {
    res.status(500).json({ message: 'Failed', error: err.message });
  }
});

router.get('/list', getAllLeaves)
router.get('/counts/list', getLeavesGroupedByDate)

router.patch('/updatestatus/:leaveId', updateLeaveStatus)



module.exports = router;