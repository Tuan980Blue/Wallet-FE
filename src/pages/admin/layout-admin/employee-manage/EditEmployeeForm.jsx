import { useState } from 'react';

const EditEmployeeForm = ({ employee, updateEmployee, deleteEmployee, cancelEdit }) => {
    const [updatedEmployee, setUpdatedEmployee] = useState(employee);

    const handleChange = (e) => {
        setUpdatedEmployee({
            ...updatedEmployee,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateEmployee(updatedEmployee);
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white max-w-4xl w-full shadow-lg rounded-lg px-8 py-6 mb-8 mt-2">
            <h2 className="flex text-2xl font-semibold mb-6 text-center">Edit Employee</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <input
                    type="text"
                    name="name"
                    value={updatedEmployee.name}
                    onChange={handleChange}
                    placeholder="Employee Name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition duration-200"
                />
                <input
                    type="text"
                    name="position"
                    value={updatedEmployee.position}
                    onChange={handleChange}
                    placeholder="Position"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition duration-200"
                />
                <input
                    type="text"
                    name="department"
                    value={updatedEmployee.department}
                    onChange={handleChange}
                    placeholder="Department"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition duration-200"
                />
                <input
                    type="email"
                    name="email"
                    value={updatedEmployee.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition duration-200"
                />
                <input
                    type="tel"
                    name="phone"
                    value={updatedEmployee.phone}
                    onChange={handleChange}
                    placeholder="Phone"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition duration-200"
                />
                <input
                    type="text"
                    name="address"
                    value={updatedEmployee.address}
                    onChange={handleChange}
                    placeholder="Address"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition duration-200"
                />
                <input
                    type="date"
                    name="dateOfBirth"
                    value={updatedEmployee.dateOfBirth}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition duration-200"
                />
                <select
                    name="gender"
                    value={updatedEmployee.gender}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition duration-200"
                >
                    <option value="Nam">Nam</option>
                    <option value="Nữ">Nữ</option>
                    <option value="Khác">Khác</option>
                </select>
                <input
                    type="date"
                    name="startDate"
                    value={updatedEmployee.startDate}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition duration-200"
                />
                <select
                    name="status"
                    value={updatedEmployee.status}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition duration-200"
                >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                </select>
            </div>
            <div className="flex flex-col justify-between items-center md:flex-row md:space-x-4">
                <div className="flex gap-4 w-full">
                    <button
                        type="submit"
                        className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                    >
                        Update Employee
                    </button>
                    <button
                        type="button"
                        onClick={cancelEdit}
                        className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition duration-200"
                    >
                        Cancel
                    </button>
                </div>
                <div className="w-full mt-4 md:mt-0">
                    <button
                        type="button"
                        onClick={() => deleteEmployee(employee.id)}
                        className="flex-1 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200"
                    >
                        Delete Employee
                    </button>
                </div>
            </div>
        </form>
    );
};

export default EditEmployeeForm;