import { useState } from 'react';
import EditEmployeeForm from "./EditEmployeeForm.jsx";
import AddEmployeeForm from "./AddEmployeeForm.jsx";
import EmployeeList from "./EmployeeList.jsx";
import EmployeeDetail from "./EmployeeDetail.jsx";
import Modal from "../../library-admin/ModalDetail.jsx";
import ModalConfirmation from "../../library-admin/ModalConfirmDelete.jsx"; // Import EmployeeDetail component

const initialEmployees = [
    {
        id: 1,
        avatar: '/avatarH.png',
        name: 'Nguyễn Anh Tuấn',
        position: 'Quản Lý',
        department: 'Kinh Doanh',
        email: 'a@example.com',
        phone: '0123456789',
        address: 'Hà Nội',
        dateOfBirth: '1990-01-01',
        gender: 'Nam',
        startDate: '2020-01-01',
        status: 'Active',
    },
    {
        id: 2,
        avatar: "/avatarT.jpeg",
        name: "Jane Smith",
        position: "Accountant",
        department: "Finance",
        email: "jane@example.com",
        phone: "0123456788",
        address: "Hà Nội",
        dateOfBirth: "1992-02-02",
        gender: "Nữ",
        startDate: "2021-01-01",
        status: "Inactive",
    },
    {
        id: 3,
        avatar: "/avatarH.png",
        name: "Mike Johnson",
        position: "Developer",
        department: "Engineering",
        email: "mike@example.com",
        phone: "0123456787",
        address: "Đà Nẵng",
        dateOfBirth: "1990-03-03",
        gender: "Nam",
        startDate: "2020-01-01",
        status: "Active",
    },
];

const EmployeeLayout = () => {
    const [employees, setEmployees] = useState(initialEmployees);
    const [editingEmployee, setEditingEmployee] = useState(null);
    const [isAdding, setIsAdding] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [isConfirmingDelete, setIsConfirmingDelete] = useState(false); // Trạng thái xác nhận xóa
    const [employeeToDelete, setEmployeeToDelete] = useState(null); // Nhân viên sẽ xóa

    // Add Employee
    const addEmployee = (employee) => {
        setEmployees([...employees, { ...employee, id: employees.length + 1 }]);
        setIsAdding(false); // Close the form after adding
    };

    // Update Employee
    const updateEmployee = (updatedEmployee) => {
        setEmployees(
            employees.map((employee) =>
                employee.id === updatedEmployee.id ? updatedEmployee : employee
            )
        );
        setEditingEmployee(null);
    };

    // Start Editing Employee
    const editEmployee = (employee) => {
        setEditingEmployee(employee);
        setIsAdding(false); // Close the add form if editing
    };

    // View Employee Detail
    const viewEmployee = (id) => {
        const employee = employees.find(emp => emp.id === id);
        setSelectedEmployee(employee);
    };

    // Clear Selected Employee
    const clearSelectedEmployee = () => {
        setSelectedEmployee(null);
    };

    // Delete Employee
    const deleteEmployee = (id) => {
        setEmployees(employees.filter((employee) => employee.id !== id));
        setIsConfirmingDelete(false); // Đóng modal xác nhận
    };

    // Mở modal xác nhận xóa
    const confirmDelete = (employee) => {
        setEmployeeToDelete(employee);
        setIsConfirmingDelete(true);
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="container mx-auto p-10 bg-gray-100 rounded-xl shadow-lg">
                <h1 className="text-4xl font-bold text-center text-primaryColor mb-2">
                    Quản Lý Nhân Viên
                </h1>

                <div className="flex justify-between items-center mb-6">
                    {!isAdding && !editingEmployee && (
                        <button
                            onClick={() => setIsAdding(true)}
                            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                        >
                            Thêm Nhân viên
                        </button>
                    )}

                    {editingEmployee && (
                        <EditEmployeeForm
                            employee={editingEmployee}
                            updateEmployee={updateEmployee}
                            deleteEmployee={confirmDelete} // Truyền hàm xác nhận xóa
                            cancelEdit={() => setEditingEmployee(null)}
                        />
                    )}
                </div>

                <Modal isOpen={!!selectedEmployee} onClose={clearSelectedEmployee}>
                    <EmployeeDetail employee={selectedEmployee} />
                </Modal>

                {isAdding && (
                    <AddEmployeeForm addEmployee={addEmployee} cancelAdd={() => setIsAdding(false)} />
                )}

                <div className="mb-6">
                    <EmployeeList employees={employees} editEmployee={editEmployee} viewEmployee={viewEmployee} />
                </div>
            </div>

            {/* Modal xác nhận xóa */}
            <ModalConfirmation
                isOpen={isConfirmingDelete}
                onClose={() => setIsConfirmingDelete(false)}
                onConfirm={() => deleteEmployee(employeeToDelete.id)}
                employeeName={employeeToDelete ? employeeToDelete.name : ''}
            />
        </div>
    );
}

export default EmployeeLayout;
