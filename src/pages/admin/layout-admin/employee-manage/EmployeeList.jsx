import {TiEye, TiEdit} from "react-icons/ti";

const EmployeeList = ({employees, editEmployee, viewEmployee}) => {
    return (
        <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Danh sách Nhân Viên</h2>
            {employees.length === 0 ? (
                <tr>
                    <td colSpan="7" className="py-2 text-center text-gray-500">
                        Danh sách Nhân viên trống!
                    </td>
                </tr>
            ) : (
                <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-xl">
                    <thead>
                    <tr className="bg-gray-100">
                        <th className="py-2 px-4 text-left border">ID</th>
                        <th className="py-2 px-4 text-left border">Avatar</th>
                        <th className="py-2 px-4 text-left border">Name</th>
                        <th className="py-2 px-4 text-left border">Position</th>
                        <th className="py-2 px-4 text-left border">Department</th>
                        <th className="py-2 px-4 text-left border">Status</th>
                        <th className="py-2 px-4 text-center border">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {employees.map((employee) => (
                        <tr key={employee.id} className="border-b hover:bg-gray-50 transition duration-200">
                            <td className="py-2 px-4 border text-gray-600 font-semibold">{employee.id}</td>
                            <td className="py-2 px-4 border">
                                <img
                                    src={employee.avatar}
                                    alt="Avatar"
                                    className="w-10 h-10 object-cover rounded-full border border-gray-300"
                                />
                            </td>
                            <td className="py-2 px-4 border">{employee.name}</td>
                            <td className="py-2 px-4 border">{employee.position}</td>
                            <td className="py-2 px-4 border">{employee.department}</td>
                            <td className={`py-2 px-4 border ${employee.status === 'Active' ? 'text-green-500' : 'text-red-500'}`}>
                                {employee.status}
                            </td>
                            <td className="py-2 text-center border">
                                <div className={"flex flex-row justify-center items-center"}>
                                    <button
                                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 flex items-center justify-center mr-2"
                                        onClick={() => viewEmployee(employee.id)}
                                    >
                                        <TiEye className="mr-1" size={18}/>
                                        Xem
                                    </button>
                                    <button
                                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 flex items-center justify-center"
                                        onClick={() => editEmployee(employee)}
                                    >
                                        <TiEdit className="mr-1" size={18}/>
                                        Edit
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default EmployeeList;