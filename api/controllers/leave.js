const Leave = require("../models/leave")


const allowedFields = ['fullName', 'designation', 'leaveDate', 'reason', 'markedBy', 'employee'];
const filterRequestBody = (body, allowedFields) => {
	return allowedFields.reduce((acc, field) => {
		if (body[field] !== undefined) acc[field] = body[field];
		return acc;
	}, {});
};

const updateLeaveStatus = async (req, res) => {
	const { leaveId } = req.params;
	const updateData = req.body;
	console.log(leaveId)
	console.log("534534", updateData)
	try {
		const updatedLeave = await Leave.findOneAndUpdate(
			{ _id: leaveId },
			updateData,
			{ new: true }
		);

		if (!updatedLeave) {
			return res.status(404).json({ message: 'Leave not found for this id.' });
		}

		res.status(200).json({ message: 'Leave Status updated successfully', data: updatedLeave });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Update failed', error });
	}
};

async function getLeavesGroupedByDate(req, res) {
	try {
		const leaves = await Leave.aggregate([
			{
				$match: {
					status: { $in: ["Approved"] } // filter leaves with these statuses
				}
			},
			{
				$group: {
					_id: {
						$dateToString: { format: "%Y-%m-%d", date: "$leaveDate" } // Format: "2025-05-16"
					},
					leaves: { $push: "$$ROOT" }
				}
			}
		]);

		// Convert array of {_id, leaves} to object with date as key
		const grouped = {};
		leaves.forEach(item => {
			grouped[item._id] = item.leaves;
		});

		return res.status(200).json({
			message: 'Leaves count fetched successfully!',
			data: grouped,
		})
	} catch (error) {
		console.error('Error grouping leaves:', error);
		throw error;
	}
}




const getAllLeaves = async (req, res) => {
	console.log("fetches Employees")
	try {
		const { search = '', status } = req.query;
		const query = {};
		if (search) {
			query.$or = [
				{ fullName: { $regex: search, $options: 'i' } },
				{ designation: { $regex: search, $options: 'i' } },
			];
		}

		if (status) {
			query.status = status;
		}


		const leaves = await Leave.find(query);

		return res.status(200).json({
			message: 'Leaves fetched successfully!',
			data: leaves,
		});
	} catch (err) {
		console.error('Error fetching leaves:', err);
		res.status(500).json({ message: 'Server error' });
	}
};

module.exports = {
	updateLeaveStatus,
	getAllLeaves,
	getLeavesGroupedByDate
}