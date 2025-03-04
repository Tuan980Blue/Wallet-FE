import {useState} from "react";
import {Checkbox, Anchor} from "@mantine/core";
import {ScrollRestoration, useNavigate} from "react-router-dom";
import {TextField} from "@mui/material";
import {wPost} from "../../util/request.util.js";
import {useQueryClient} from "@tanstack/react-query";

// Các loại quỹ
const fundTypes = ["Du lịch", "Tiết kiệm", "Sinh nhật", "Khác"];

const NewFund = () => {
    const [fundData, setFundData] = useState({
        fundName: "",
        purpose: "",
        contributionAmount: "",
        contributionDeadline: "",
        fundManager: "",
        spendingRules: "",
        fundType: "",
    });
    const [errors, setErrors] = useState({});
    const [charCount, setCharCount] = useState(0);
    const [termsAccepted, setTermsAccepted] = useState(false);
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const handleTypeSelect = (type) => {
        setFundData({...fundData, fundType: type});
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === "checkbox") {
            setTermsAccepted(checked);
        }else if (name === "contributionAmount") {
            const value = e.target.value.replace(/\D/g, ""); // chỉ lấy số, loại bỏ ký tự khác
            const formattedValue = new Intl.NumberFormat("vi-VN").format(value);
            setFundData({ ...fundData, contributionAmount: formattedValue });
        } else {
            setFundData({...fundData, [name]: value});
            setFundData({ ...fundData, [name]: value });
            if (name === "purpose") {
                setCharCount(value.length);
            }
        }
    };

    const validateForm = () => {
        let newErrors = {};
        // Kiểm tra tên quỹ (bắt buộc nhập)
        if (!fundData.fundName.trim()) {
            newErrors.fundName = "Vui lòng nhập tên quỹ.";
        } else {
            if (fundData.fundName.length < 5 || fundData.fundName.length > 50) {
                newErrors.fundName = "Tên quỹ phải từ 5 đến 50 ký tự.";
            }
            if (/[^a-zA-Z0-9ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềểếìỉịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹ\s]/.test(fundData.fundName)) {
                newErrors.fundName = "Tên quỹ không được chứa ký tự đặc biệt.";
            }
            if (/^\d+$/.test(fundData.fundName)) {
                newErrors.fundName = "Tên quỹ không hợp lệ.";
            }
        }
        // Kiểm tra tiền mục tiêu
        if (!fundData.contributionAmount.trim()) {
            newErrors.contributionAmount = "Vui lòng nhập số tiền mục tiêu.";
        } else {
            // Remove all non-digit characters
            const numericValue = fundData.contributionAmount.replace(/\D/g, ""); // chỉ lấy số, loại bỏ ký tự khác

            // Convert to number
            const numericAmount = parseFloat(numericValue);

            // Check if the numeric amount is valid and within the specified range
            if (isNaN(numericAmount)) {
                newErrors.contributionAmount = "Số tiền mục tiêu không hợp lệ.";
            } else if (numericAmount < 10000 || numericAmount > 100000000000) {
                newErrors.contributionAmount = "Số tiền mục tiêu phải từ 10.000 đến 100.000.000.000.";
            }
        }

        // Kiểm tra ngày đóng góp hợp lệ
        if (!fundData.contributionDeadline.trim()) {
            newErrors.contributionDeadline = "Vui lòng nhập ngày hạn quỹ.";
        } else {
            const deadline = new Date(fundData.contributionDeadline);
            const today = new Date();

            if (isNaN(deadline.getTime())) {
                newErrors.contributionDeadline = "Ngày đóng góp không hợp lệ.";
            } else if (deadline <= today) {
                newErrors.contributionDeadline = "Ngày đóng góp phải sau ngày hiện tại.";
            }
        }
        if (fundData.purpose.length > 200) {
            newErrors.purpose = "Mô tả quỹ phải dưới 200 ký tự.";
        }
        if (!termsAccepted) {
            newErrors.termsAccepted = "Bạn phải chấp nhận điều khoản và điều kiện.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const response = await wPost('/v1/group-fund', {
                    name: fundData.fundName,
                    image: "/sanmay.png",
                    type: fundData.fundType,
                    description: fundData.purpose,
                    target: fundData.contributionAmount.replace(/[^\d]/g, ''),
                    targetDate: fundData.contributionDeadline,
                });
                console.log('Quỹ được tạo thành công:', response.data);
                queryClient.invalidateQueries({ queryKey: ['groupFunds'] });
                navigate(`/group-fund`);
            } catch (error) {
                console.error('Có lỗi xảy ra khi tạo quỹ:', error);
            }
        } else {
            console.log("Form có lỗi");
        }
    };

    const handleBack = (e) => {
        e.preventDefault();
        navigate(-1); // Quay lại trang trước
    };

    return (
        <div className={"mb-10"}>
            <div className="flex justify-center items-center bg-gray-100">
                <div className="bg-white shadow-2xl rounded-3xl px-10 py-6 max-w-2xl w-full">
                    {/* Tiêu đề */}
                    <h2 className="text-3xl font-bold mb-8 text-center text-indigo-600">
                        Tạo Quỹ Nhóm
                    </h2>
                    <div>
                        {/* Tên quỹ nhóm */}
                        <div className="mb-4">
                            <TextField
                                label={"Tên quỹ nhóm"}
                                type="text"
                                name="fundName"
                                value={fundData.fundName}
                                onChange={handleInputChange}
                                placeholder="Nhập tên quỹ"
                                className="w-full p-4 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                required
                            />
                            {errors.fundName && <p className="text-red-500 mt-2">{errors.fundName}</p>}
                        </div>

                        {/* Thể loại quỹ */}
                        <div className="mb-6">
                            <label className="block text-lg text-gray-700 mb-2">Bạn Tạo Quỹ Để</label>
                            <div className="flex flex-wrap gap-3">
                                {fundTypes.map((type) => (
                                    <button
                                        key={type}
                                        type="button"
                                        onClick={() => handleTypeSelect(type)}
                                        className={`px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                                            fundData.fundType === type
                                                ? "bg-indigo-500 text-white"
                                                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                        }`}
                                    >
                                        {type}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Số tiền đóng góp */}
                        <div className="mb-4">
                            <TextField
                                label={"Số tiền mục tiêu"}
                                type="text"
                                name="contributionAmount"
                                value={fundData.contributionAmount}
                                onChange={handleInputChange}
                                placeholder="Nhập số tiền(nếu có)"
                                className="w-full p-4 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                required
                            />
                            {errors.contributionAmount && (
                                <p className="text-red-500 mt-2">{errors.contributionAmount}</p>
                            )}
                        </div>

                        {/* Ngày hoàn thành mục tiêu */}
                        <div className="mb-6">
                            <label className="block text-lg text-gray-700 mb-2">
                                Ngày Hoàn Thành Mục Tiêu
                            </label>
                            <input
                                type="date"
                                name="contributionDeadline"
                                value={fundData.contributionDeadline}
                                onChange={handleInputChange}
                                min={new Date().toISOString().split("T")[0]}
                                className="w-full p-4 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                required
                            />
                            {errors.contributionDeadline && (
                                <p className="text-red-500 mt-2">{errors.contributionDeadline}</p>
                            )}
                        </div>

                        {/* Mô tả quỹ */}
                        <div className="mb-6">
                            <TextField
                                label={`Mô tả quỹ (${charCount}/200)`}
                                name="purpose"
                                value={fundData.purpose}
                                onChange={handleInputChange}
                                placeholder="Đi trốn trên Đà Lạt.."
                                className="w-full p-4 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                required
                            />
                            {errors.purpose && <p className="text-red-500 mt-2">{errors.purpose}</p>}
                        </div>

                        {/* Điều khoản */}
                        <div className="mb-4">
                            <Checkbox
                                label={
                                    <div className="text-gray-700">
                                        Tôi chấp nhận{" "}
                                        <Anchor href="https://mantine.dev" target="_blank" inherit>
                                            điều khoản và điều kiện
                                        </Anchor>
                                    </div>
                                }
                                checked={termsAccepted}
                                onChange={handleInputChange}
                            />
                            {errors.termsAccepted && <p className="text-red-500 mt-1 text-sm">{errors.termsAccepted}</p>}
                        </div>

                        {/* Nút điều khiển */}
                        <div className="flex justify-between gap-6">
                            <button
                                onClick={handleBack}
                                className="w-full bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition duration-200"
                            >
                                Quay về
                            </button>
                            <button
                                onClick={handleSubmit}
                                className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition duration-200 shadow-lg"
                            >
                                Tạo Quỹ Nhóm
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <ScrollRestoration/>
        </div>
    );
};

export default NewFund;