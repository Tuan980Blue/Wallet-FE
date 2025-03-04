import { useState } from 'react';
import { TextField, Button, MenuItem } from '@mui/material';
import { BeatLoader } from "react-spinners";
import {TiDelete} from "react-icons/ti";

const AddEmployeeForm = ({ addEmployee, cancelAdd }) => {
    const [employee, setEmployee] = useState({
        name: '',
        position: '',
        department: '',
        email: '',
        phone: '',
        address: '',
        status: 'Active',
        dateOfBirth: '',
        gender: '',
        startDate: ''
    });

    const [loading, setLoading] = useState(false);
    const [avatar, setAvatar] = useState(null); // State for storing the avatar

    const handleChange = (e) => {
        setEmployee({
            ...employee,
            [e.target.name]: e.target.value,
        });
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatar(reader.result); // Set the image preview
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveAvatar = () => {
        setAvatar(null); // Remove the avatar
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true); // Show loader
        addEmployee({ ...employee, avatar }); // Include avatar in employee data

        setTimeout(() => {
            setLoading(false);
            setEmployee({
                name: '',
                position: '',
                department: '',
                email: '',
                phone: '',
                address: '',
                status: 'Active',
                dateOfBirth: '',
                gender: '',
                startDate: ''
            });
            setAvatar(null); // Reset avatar after submission
        }, 2000);
    };

    return (
        <form onSubmit={handleSubmit} className="mb-8 bg-white px-8 py-6 rounded-lg shadow-2xl">
            <h2 className="text-3xl font-semibold mb-2 text-gray-800">Thêm Nhân Viên</h2>
            <div className="grid grid-cols-2 gap-x-6">

                {/* Name */}
                <TextField
                    label="Tên Nhân Viên"
                    name="name"
                    value={employee.name}
                    onChange={handleChange}
                    fullWidth
                    required
                    margin="normal"
                    variant="outlined"
                />

                {/* Position */}
                <TextField
                    label="Chức Vụ"
                    name="position"
                    value={employee.position}
                    onChange={handleChange}
                    fullWidth
                    required
                    margin="normal"
                    variant="outlined"
                />

                {/* Department */}
                <TextField
                    label="Phòng Ban"
                    name="department"
                    value={employee.department}
                    onChange={handleChange}
                    fullWidth
                    required
                    margin="normal"
                    variant="outlined"
                    select
                >
                    <MenuItem value="IT">Công Nghệ Thông Tin</MenuItem>
                    <MenuItem value="HR">Nhân Sự</MenuItem>
                    <MenuItem value="Marketing">Marketing</MenuItem>
                    <MenuItem value="KT">Kế Toán</MenuItem>
                    <MenuItem value="BV">Bảo Vệ</MenuItem>
                </TextField>

                {/* Email */}
                <TextField
                    label="Email"
                    name="email"
                    value={employee.email}
                    onChange={handleChange}
                    fullWidth
                    required
                    margin="normal"
                    variant="outlined"
                    type="email"
                />

                {/* Phone */}
                <TextField
                    label="Số Điện Thoại"
                    name="phone"
                    value={employee.phone}
                    onChange={handleChange}
                    fullWidth
                    required
                    margin="normal"
                    variant="outlined"
                    type="tel"
                />

                {/* Address */}
                <TextField
                    label="Địa Chỉ"
                    name="address"
                    value={employee.address}
                    onChange={handleChange}
                    fullWidth
                    required
                    margin="normal"
                    variant="outlined"
                />

                {/* Date of Birth */}
                <TextField
                    label="Ngày Sinh"
                    name="dateOfBirth"
                    value={employee.dateOfBirth}
                    onChange={handleChange}
                    fullWidth
                    required
                    margin="normal"
                    variant="outlined"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                />

                {/* Gender */}
                <TextField
                    label="Giới Tính"
                    name="gender"
                    value={employee.gender}
                    onChange={handleChange}
                    fullWidth
                    required
                    margin="normal"
                    variant="outlined"
                    select
                >
                    <MenuItem value="Male">Nam</MenuItem>
                    <MenuItem value="Female">Nữ</MenuItem>
                    <MenuItem value="Other">Khác</MenuItem>
                </TextField>

                {/* Start Date */}
                <TextField
                    label="Ngày Bắt Đầu"
                    name="startDate"
                    value={employee.startDate}
                    onChange={handleChange}
                    fullWidth
                    required
                    margin="normal"
                    variant="outlined"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                />

                {/* Status */}
                <TextField
                    label="Trạng Thái"
                    name="status"
                    value={employee.status}
                    onChange={handleChange}
                    fullWidth
                    select
                    margin="normal"
                    variant="outlined"
                >
                    <MenuItem value="Active" sx={{ color: 'green'}}>
                        Đang hoạt động
                    </MenuItem>
                    <MenuItem value="Inactive" sx={{ color: 'red'}}>
                        Không hoạt động
                    </MenuItem>
                </TextField>

                {/* Avatar Upload */}
                <div className="col-span-2 mt-4 flex flex-col justify-center">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarChange}
                        style={{ display: 'none' }} // Hide default file input
                        id="avatar-upload"
                    />
                    <label htmlFor="avatar-upload">
                        <Button variant="contained" component="span" color="info">
                            Tải Ảnh Đại Diện
                        </Button>
                    </label>
                    {avatar && (
                        <div className="relative mt-4 ">
                            {/* Avatar Image */}
                            <img
                                src={avatar}
                                alt="Avatar Preview"
                                className="w-24 h-24 object-cover rounded-full border-2 border-gray-300 shadow-lg"
                            />

                            {/* Remove Avatar Button */}
                            <button
                                className="absolute top-0 left-18 bg-red-600 hover:bg-red-700 text-white rounded-full p-1 transition duration-200"
                                onClick={handleRemoveAvatar}
                            >
                                <TiDelete size={20}/>
                            </button>
                        </div>
                    )}
                </div>

            </div>

            {/* Buttons */}
            <div className="flex justify-end space-x-4 mt-6">
                {!loading && (
                    <>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            size="large"
                        >
                            Thêm Nhân Viên
                        </Button>
                        <Button
                            variant="outlined"
                            color="secondary"
                            size="large"
                            onClick={cancelAdd}
                        >
                            Hủy
                        </Button>
                    </>
                )}
            </div>

            {/* BeatLoader */}
            {loading && (
                <div className="flex justify-center mt-4">
                    <BeatLoader color="#2ac1d9" margin={2} size={13} />
                </div>
            )}
        </form>
    );
};

export default AddEmployeeForm;
