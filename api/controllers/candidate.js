const Candidate = require("../models/candidate")


const allowedFields = ['fullName', 'email', 'status', 'isEmployee', 'phoneNumber', 'position', 'experience', 'resume', 'createdBy'];
const filterRequestBody = (body, allowedFields) => {
  return allowedFields.reduce((acc, field) => {
    if (body[field] !== undefined) acc[field] = body[field];
    return acc;
  }, {});
};

const updateCandidateStatus = async (req, res) => {
  const { userId } = req.params;
  const updateData = req.body;

  if (updateData.status === 'selected') {
    updateData.isEmployee =true 
  }else{
    updateData.isEmployee =false 
  }

  try {
    const updatedCandidate = await Candidate.findOneAndUpdate(
      { userId },
      updateData,
      { new: true }
    );

    if (!updatedCandidate) {
      return res.status(404).json({ message: 'Candidate not found for this user.' });
    }

    res.status(200).json({ message: 'Candidate updated successfully', data: updatedCandidate });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Update failed', error });
  }
};



const getCandidateData = async (req, res) => {
    const { candidateId } = req.params;
  
    try {
      const candidate = await Candidate.findById(candidateId);
  
      if (!candidate) {
        return res.status(404).json({ message: 'Candidate not found' });
      }
  
      res.status(200).json(candidate);
    } catch (error) {
      console.error('Error fetching candidate by ID:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };



const getAllCandidates = async (req, res) => {
  console.log("fetches candidates")
  try {
    const { search = '', status, position } = req.query;

    // Build dynamic query
    const query = {};

    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }

    if (status) {
      query.status = status;
    }

    if (position) {
      query.position = position;
    }

    const candidates = await Candidate.find(query);

    return res.status(200).json({
      message: 'Candidates fetched successfully!',
      data: candidates,
    });
  } catch (err) {
    console.error('Error fetching candidates:', err);
    res.status(500).json({ message: 'Server error' });
  }
};


const getAllEmployees = async (req, res) => {
  console.log("fetches Employees")
  try {
    const { search = '', status, role } = req.query;

    // Build dynamic query
    const query = {
      isEmployee: true,
    };

    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }

    if (status) {
      query.status = status;
    }

    if (role) {
      query.role = role;
    }

    const candidates = await Candidate.find(query);

    return res.status(200).json({
      message: 'Candidates fetched successfully!',
      data: candidates,
    });
  } catch (err) {
    console.error('Error fetching candidates:', err);
    res.status(500).json({ message: 'Server error' });
  }
};



async function handleEditCandidate(req, res) {
  try {
    const updatedData = filterRequestBody(req.body, allowedFields);
    const updatedUser = await Candidate.findByIdAndUpdate(req.params.candidateId, updatedData, { new: true, runValidators: true });
    if (!updatedUser) {
      return res.status(404).json({ message: 'Candidate not found' });
    }
    return res.status(200).json({
      message: 'Candidate updated successfully!',
      user: updatedUser
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error updating candidate', error: error.message });
  }
}


module.exports = {
  getAllCandidates,
  handleEditCandidate,
  updateCandidateStatus,
  getAllEmployees,
  getCandidateData
};