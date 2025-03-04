import { useState, useEffect } from "react";
import { wGet, wPost } from "../../../util/request.util.js";
import {TextField} from "@mui/material";

const InviteMember = ({ fundId, userId, onCancel }) => {
    const [email, setEmail] = useState("");
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [member, setMember] = useState(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (email) {
                validateEmail(email) ? checkEmail(email) : handleInvalidEmail();
            } else {
                resetEmailState();
            }
        }, 1300);

        return () => clearTimeout(timer);
    }, [email]);

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const handleInvalidEmail = () => {
        setIsEmailValid(false);
        setErrorMessage("Email không đúng định dạng. Vui lòng kiểm thử lại.");
        setSuccessMessage(null);
    };

    const resetEmailState = () => {
        setIsEmailValid(false);
        setErrorMessage(null);
        setSuccessMessage(null);
        setMember(null);
    };

    const checkEmail = async (email) => {
        try {
            const response = await wGet(`/v1/transfer/check/${email}`);
            setMember(response);
            setIsEmailValid(true);
            setErrorMessage(null);
        } catch {
            setIsEmailValid(false);
            setMember(null);
            setErrorMessage("Email không tồn tại trong hệ thống.");
        }
    };

    const handleInvite = async () => {
        if (!isEmailValid || !member) {
            setErrorMessage("Vui lòng nhập email hợp lệ trước khi mời.");
            return;
        }

        const body = {
            groupId: fundId,
            senderId: userId,
            recipientId: member.id,
        };

        try {
            const response = await wPost(`/v1/invitations`, body);
            setSuccessMessage("Gửi lời mời thành công!");
            setErrorMessage(null);
        } catch {
            setErrorMessage("Có lỗi xảy ra khi gửi lời mời. Vui lòng thử lại.");
        }
    };

    const handleCancel = () => {
        resetEmailState();
        if (onCancel) onCancel();
    };

    return (
        <div
            className="px-8 py-4 border border-cyan-500 rounded-2xl shadow-lg transition-transform duration-300 transform bg-gray-100">
            <h2 className="text-xl font-extrabold text-gray-700 mb-6">Mời Thành Viên</h2>

            <TextField
                type="email"
                label="Nhập email"
                placeholder="Nhập email người nhận"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="p-4 bg-white w-full border border-gray-300 rounded-lg text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-200"
            />

            {member && (
                <div className="flex items-center justify-between mt-2 bg-white p-4 rounded-xl shadow-inner border-2 border-cyan-200">
                    <div className="flex items-center">
                        <img
                            src={member.avatar || "/avatarH.png"}
                            alt="Avatar"
                            className="w-14 h-14 rounded-full border-2 border-green-400 mr-4"
                        />
                        <div>
                            <p className="text-lg font-semibold text-gray-800">{member.username}</p>
                            <p className="text-gray-500 text-sm">{member.email}</p>
                        </div>
                    </div>
                    <button
                        onClick={handleInvite}
                        className={`px-6 py-2 text-white rounded-lg font-semibold shadow-md transition-all duration-200 ${
                            isEmailValid ? 'bg-cyan-500 hover:bg-cyan-600' : 'bg-gray-300 cursor-not-allowed'
                        }`}
                        disabled={!isEmailValid}
                    >
                        Mời
                    </button>
                </div>
            )}

            {errorMessage && <p className="text-red-500 mt-3 text-sm font-medium">{errorMessage}</p>}
            {successMessage && <p className="text-green-500 mt-3 text-sm font-medium">{successMessage}</p>}

            <div className="flex justify-end mt-6">
                <button
                    onClick={handleCancel}
                    className="px-6 py-2 bg-white text-gray-700 rounded-lg font-semibold shadow-md hover:bg-gray-300 transition duration-200"
                >
                    Hủy
                </button>
            </div>
        </div>
    );
};

export default InviteMember;
