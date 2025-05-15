import React from 'react'
import CommonTable from './common/Table';
import Sidebar from './Sidebar';
import { ReactComponent as Mails } from '../assets/svgs/mails.svg';
import { ReactComponent as Search } from '../assets/svgs/search.svg';
import { ReactComponent as Notifications } from '../assets/svgs/Notification.svg';
import { StatusArray } from './Dashboard';


const columns = [
    { key: "fullName", label: "Employeee Name" },
    { key: "position", label: "Position" },
    { key: "department", label: "Department" },
    {
        key: "tasks", label: "Tasks",
        renderCell: (_, row) => (

            <p>{row.tasks.join(',')}</p>
        )
    },
    {
        key: "status", label: "Status",
        renderCell: () => (
            <select>
                <option value="Active">Active</option>
                <option value="On Leave">On Leave</option>
                <option value="Inactive">Inactive</option>
            </select>
        )
    },

]

const employees = [
    {
        id: 1,
        fullName: "Alice Johnson",
        position: "Software Engineer",
        department: "Development",
        tasks: ["Implement login feature", "Fix bugs in dashboard"],
        status: "Active",
    },
    {
        id: 2,
        fullName: "Bob Smith",
        position: "Project Manager",
        department: "Management",
        tasks: ["Plan project roadmap", "Coordinate team meetings"],
        status: "On Leave",
    },
    {
        id: 3,
        fullName: "Carol Lee",
        position: "UX Designer",
        department: "Design",
        tasks: ["Create wireframes", "Conduct user research"],
        status: "Active",
    },
    {
        id: 4,
        fullName: "David Kim",
        position: "QA Tester",
        department: "Quality Assurance",
        tasks: ["Write test cases", "Perform regression testing"],
        status: "Inactive",
    },
    {
        id: 5,
        fullName: "Eva Green",
        position: "DevOps Engineer",
        department: "Operations",
        tasks: ["Maintain CI/CD pipelines", "Monitor server health"],
        status: "Active",
    },
];




const Attendance = () => {
    return (
        <div className="d-flex dashboard-main">
            {/* Sidebar */}
            <Sidebar />


            <div className="p-4 px-3 w-100">
                <marquee direction="left" style={{color:"red"}}>
                   filters Work in Progress
                </marquee>
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="fw-bold">Attendance</h5>
                    <div className="border-start-0 gap-3 px-3">

                        <Mails />
                        <Notifications />
                        <img src="" className="border-3" />
                    </div>
                </div>

                <div className="d-flex flex-wrap align-items-end justify-content-between mb-3 gap-3">

                    <div className="d-flex gap-2">
                        <select className="form-select w-auto border-line border-style"
                        // onChange={(e) => setFilters(p => ({ ...p, status: e.target.value }))}
                        >
                            <option value="" disabled selected>Status</option>
                            <option value=''>All</option>
                            {StatusArray.map(i =>
                                <option value={i.value}>{i.label.charAt(0) + i.label.slice(1, i.length)}</option>
                            )}

                        </select>
                        <select className="form-select w-auto border-line border-style"
                        // onChange={(e) => setFilters(p => ({ ...p, position: e.target.value }))}
                        >
                            <option value="" disabled selected>Position</option>
                            <option key='all' value=''>All</option>
                            {/* {
                                [...new Set(data?.data.map(d => d.position))].map((pos, ind) =>
                                    <option key={ind} value={pos}>{pos}</option>)
                            } */}
                        </select>
                    </div>
                    <div className="d-flex align-items-center gap-3  border-start-0">
                        <div className="input-group border-line border-style" style={{ width: "250px" }}>
                            <span className="input-group-text bg-white border-line ">
                                <Search />
                            </span>
                            <input
                                type="text"
                                className="form-control border-line"
                                placeholder="Search..."
                            // onChange={(e) => setFilters(p => ({ ...p, search: e.target.value }))}
                            />
                        </div>
                    </div>
                </div>

                <div className="table-wrapper border rounded overflow-hidden">
                    <CommonTable data={employees} columns={columns} />

                </div>
            </div>
        </div>

    )
}

export default Attendance