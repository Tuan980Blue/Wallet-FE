import { useState } from 'react';
import {FormControl, TextField} from "@mui/material";

const RoleForm = ({ onAddRole, roles }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = () => {
        // Check if name or description is empty
        if (!name || !description) {
            setError('Tên vai trò và mô tả không được để trống.');
            return;
        }

        // Check if role name already exists
        const roleExists = roles.some(role => role.name.toLowerCase() === name.toLowerCase());
        if (roleExists) {
            setError('Tên vai trò này đã tồn tại.');
            return;
        }

        // Add role if all checks pass
        onAddRole(name, description);
        setName('');
        setDescription('');
        setError('');
    };

    return (
        <div className="mb-6 p-6 bg-white rounded-lg shadow-md border-2 border-emerald-100">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Tạo Vai Trò Mới</h2>

            {/* Form Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Role Name Input */}
                <div>
                    <FormControl fullWidth error={Boolean(error)}>
                        <TextField
                            id="roleName"
                            label="Tên Vai Trò"
                            variant="outlined"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            fullWidth
                            className="mb-4"
                            helperText={error && error.includes('Tên vai trò này') ? error : ''}
                        />
                    </FormControl>
                </div>

                {/* Role Description Input */}
                <div>
                    <FormControl fullWidth error={Boolean(error)}>
                        <TextField
                            id="roleDescription"
                            label="Mô Tả Vai Trò"
                            variant="outlined"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            fullWidth
                            className="mb-4"
                            helperText={error && !error.includes('Tên vai trò này') ? error : ''}
                        />
                    </FormControl>
                </div>
            </div>

            {/* Submit Button */}
            <div className="mt-4">
                <button
                    onClick={handleSubmit}
                    className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                >
                    Thêm Vai Trò
                </button>
            </div>
        </div>
    );
};

export default RoleForm;
