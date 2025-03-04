import { FaUserCheck } from "react-icons/fa6";
import { useState } from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../modules/hooks/useAuth.jsx';
import CameraModal from "./CameraModal.jsx";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { wPost } from "../../util/request.util.js";
import TicketRequestSuccess from "../support-ticket/TicketRequestSuccess.jsx";

const ManualIdentityAuth = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isIdVisible, setIsIdVisible] = useState(false);
  const [previewFront, setPreviewFront] = useState(null);
  const [previewBack, setPreviewBack] = useState(null);
  const [numberCard, setNumberCard] = useState("");
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [type, setType] = useState("CCCD");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const userID = user.id;

  const handleOpenCamera = () => {
    setIsCameraOpen(true);
  };

  const handleCaptchaChange = (value) => {
    setCaptchaVerified(!!value); 
  };

  const handleCloseCamera = () => {
    setIsCameraOpen(false);
  };

  const handleCapture = (dataUrl) => {
    setCapturedImage(dataUrl);
  };

  const [openDate, setOpenDate] = useState('');
  const [closeDate, setCloseDate] = useState('');

  const handleBack = () => {
    navigate('/management-personal/identity-auth');
  }

  const toggleIdVisibility = () => {
    setIsIdVisible(!isIdVisible);
  }

  const handleChangeType = (event) => {
    setType(event.target.value);
  };

  const handleChangeNumberCard = (e) => {
    let newValue = e.target.value;
    newValue = newValue.replace(/[^0-9]/g, '');
    if (newValue.length > 12) {
      newValue = newValue.slice(0, 12);
    }
    setNumberCard(newValue);
  };

  const handleFileChange = (event, setPreview) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert("Kích thước ảnh không được quá 10Mb");
      } else {
        setPreview(URL.createObjectURL(file));
      }
    }
  };

  const handleOpenDateChange = (e) => {
    setOpenDate(e.target.value);
  };

  const handleCloseDateChange = (e) => {
    const newCloseDate = e.target.value;
    
    if (openDate && newCloseDate < openDate) {
      toast.error('Ngày hết hạn phải lớn hơn hoặc bằng ngày cấp');
      return;
    }
    
    setCloseDate(newCloseDate);
  };

  const showToast = (message) => {
    toast.dismiss(); 
    toast.error(message);
  };

  const Validate = () => {
    if (!numberCard || !previewFront || !previewBack || !capturedImage || !openDate || !closeDate) {
      toast.error('Các trường dữ liệu không được trống');
      return false;
    }

    if (new Date(closeDate) <= new Date(openDate)) {
      toast.error('Ngày hết hạn phải lớn hơn ngày cấp');
      return false;
    }

    if (!captchaVerified) {
      toast.error("Vui lòng xác nhận reCAPTCHA trước khi tiếp tục.");
      return false;
    }

    return true;
  };

  const formatToDateTime = (date) => {
    return date.includes("T") ? date : `${date}T00:00:00`;
  };

  function compressImage(imageBlob, maxWidth = 800, maxHeight = 800) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const reader = new FileReader();
      reader.onloadend = () => {
        img.src = reader.result;
      };
      reader.onerror = reject;   
      reader.readAsDataURL(imageBlob);
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const scale = Math.min(maxWidth / img.width, maxHeight / img.height);
        const width = img.width * scale;
        const height = img.height * scale;  
        canvas.width = width;
        canvas.height = height;
        
        ctx.drawImage(img, 0, 0, width, height);
        canvas.toBlob((blob) => {
          resolve(blob);
        }, 'image/jpeg', 0.7); 
      };
    });
  }

  const prepareFormData = async () => {
    const formData = new FormData();
    formData.append('customerId', user?.id);  
    formData.append("type", type);
    formData.append("numberCard", numberCard);
    formData.append("openDay", formatToDateTime(openDate));
    formData.append("closeDay", formatToDateTime(closeDate));

    let frontBlob = previewFront;
    if (typeof previewFront === 'string' && previewFront.startsWith('blob:')) {
        frontBlob = await fetch(previewFront).then(res => res.blob());
    }
    let backBlob = previewBack;
    if (typeof previewBack === 'string' && previewBack.startsWith('blob:')) {
        backBlob = await fetch(previewBack).then(res => res.blob());
    }

    let compressedFrontBlob, compressedBackBlob;
    if (frontBlob instanceof Blob) {
        compressedFrontBlob = await compressImage(frontBlob);
    }
    if (backBlob instanceof Blob) {
        compressedBackBlob = await compressImage(backBlob);
    }

    let capturedImageBlob;
    if (typeof capturedImage === 'string' && capturedImage.startsWith('data:image')) {
        const base64Data = capturedImage.split(',')[1];
        const binaryData = atob(base64Data);
        const byteArray = new Uint8Array(binaryData.length);
        for (let i = 0; i < binaryData.length; i++) {
            byteArray[i] = binaryData.charCodeAt(i);
        }
        capturedImageBlob = new Blob([byteArray], { type: 'image/png' });
    } else if (capturedImage instanceof Blob || capturedImage instanceof File) {
        capturedImageBlob = capturedImage;  
    } else {
        throw new Error("capturedImage không hợp lệ hoặc không ở dạng base64.");
    }

    let compressedCapturedImageBlob;
    if (capturedImageBlob instanceof Blob) {
        compressedCapturedImageBlob = await compressImage(capturedImageBlob);
    }

    formData.append("fontImage", compressedFrontBlob, "frontImage.png");
    formData.append("behindImage", compressedBackBlob, "behindImage.png");
    formData.append("userImage", compressedCapturedImageBlob, "userImage.png");

    return formData;
  };

  const createVerify = async (formData) => {
      try {
          const response = await wPost('/v1/verifications/create', formData, {
              headers: { 'Content-Type': 'multipart/form-data' }
          });
          if (typeof response === 'string') {
            return { success: true, message: response };  
          }
          if (response.data && response.data.success) {
              return response.data;
          } else {
              throw new Error("Phản hồi không hợp lệ từ API.");
          }
      } catch (error) {
        if (error.response) {
            const errorMessage = error.response.data || "Đã xảy ra lỗi từ phía server."; 
            throw new Error(errorMessage);
        } else if (error.request) {
            throw new Error("Không thể kết nối đến server. Vui lòng kiểm tra mạng.");
        } else {
            throw new Error(`Unexpected Error: ${error.message}`);
        }
    }
  };

  const handleSubmit = async (event) => {
      event.preventDefault();
      if (Validate()) {
          try {
              const formData = await prepareFormData(); 
              const response = await createVerify(formData); 
              if (response.success) {
                setShowSuccessModal(true);
              } else {
                  showToast(response.message);
              }
          } catch (error) {
              showToast(error.message);
          }
      }
  };

  return (
    <div className="transaction-account ml-2 bg-white w-auto h-auto rounded-lg p-2 pb-9">
      <div className="info-header ml-2 items-center mt-2 flex mb-1">
        <div className="text-primaryColor">
          <FaUserCheck size={20} />
        </div>
        <div className="font-normal text-md ml-2">CHỨNG THỰC TÀI KHOẢN - TỰ CHỨNG THỰC</div>
        <div className="ml-auto font-normal text-md mr-5 text-primaryColor">BƯỚC 1/2</div>
      </div>

      <div className="info-container mx-3 mt-3 h-auto">
        <div className="h-auto w-auto bg-dimPrimaryColor rounded-lg py-3 mt-6">
          <div className="flex items-center ml-5 mb-2">
            <p className="text-base mr-2">Họ và tên chủ TK:</p>
            <p className="uppercase font-medium text-primaryColor">{user.lastName} {user.firstName}</p>
          </div>
          <div className="flex items-center ml-5">
            <p className="text-base mr-2">Mã tài khoản:</p>
            {isIdVisible ? (
              <p className="font-medium">{user.id}</p>
            ) : (
              <p className="font-medium">*****************</p>
            )}
            <button
              className="ml-2 text-primaryColor font-semibold"
              onClick={toggleIdVisibility}
            >
              {isIdVisible ? "Ẩn" : "Hiển thị"} ID
            </button>
          </div>
        </div>

        <div className="mt-9">
          <div>
            <p className="font-normal text-md ml-2">THÔNG TIN CHỨNG THỰC</p>
          </div>
          <div className="grid-rows-4 space-y-7 mt-5">
            <div className="row-span-1 lg:flex items-center">
              <div className="w-48 flex-none text-left lg:text-right ml-20 lg:ml-0 mr-3">
                <p className="text-textGray0 font-medium text-base">Số giấy chứng thực<span className="ml-1 text-red-500">*</span></p>
              </div>
              <div className="flex items-center relative lg:w-1/2 w-1/2 ml-20 lg:ml-0 mt-2 lg:mt-0 space-x-2">
                <select
                  className="form-select block rounded border h-11 w-full"
                  value={type}
                  onChange={handleChangeType}
                >
                  <option value="CCCD">CCCD</option>
                  <option value="Hộ chiếu">Hộ chiếu</option>
                </select>
                <input
                type="text"
                value={numberCard}
                maxLength="12"
                style={{ letterSpacing: "2px" }}
                className="border rounded h-11 w-full pl-2"
                onChange={handleChangeNumberCard}
                required
                />
              </div>
            </div>
            <div className="row-span-1 lg:flex items-center">
              <div className="w-48 flex-none text-left lg:text-right ml-20 lg:ml-0 mr-3">
                <p className="text-textGray0 font-medium text-base">Ngày cấp<span className="ml-1 text-red-500">*</span></p>
              </div>
              <div className="relative lg:w-1/2 w-1/2 ml-20 lg:ml-0 mt-2 lg:mt-0">
                <input
                  type={"date"}
                  value={openDate}
                  onChange={handleOpenDateChange}
                  className={`border rounded p-2 sm:w-full text-textGray`}
                />
              </div>
            </div>
            <div className="row-span-1 lg:flex items-center">
              <div className="w-48 flex-none text-left lg:text-right ml-20 lg:ml-0 mr-3">
                <p className="text-textGray0 font-medium text-base">Ngày hết hạn<span className="ml-1 text-red-500">*</span></p>
              </div>
              <div className="relative lg:w-1/2 w-1/2 ml-20 lg:ml-0 mt-2 lg:mt-0">
                <input
                  type={"date"}
                  value={closeDate}
                  onChange={handleCloseDateChange}
                  className={`border rounded p-2 sm:w-full text-textGray`}
                  min={openDate}
                />
              </div>
            </div>
          </div>

          <div className="border-b-1 my-9"></div>

          <div>
            <p className="font-normal text-md ml-2">GIẤY TỜ CHỨNG THỰC</p>
          </div>
          <div className="grid-rows-4 space-y-7 mt-5">
            <div className="row-span-1 lg:flex items-center">
              <div className="w-36 flex text-left lg:text-right ml-20 lg:ml-12 mr-3">
                <p className="text-textGray0 font-medium text-base">Ảnh mặt trước giấy chứng thực</p>
                <span className="ml-1 text-red-500">*</span>
              </div>
              <div className="flex relative ml-20 lg:ml-0 mt-2 lg:mt-0 items-center">
                <button
                  className="hover:bg-primaryColor hover:text-white rounded-md border border-primaryColor py-2 px-4"
                  onClick={() => document.getElementById("fileInputFont").click()}
                >
                  Chọn ảnh
                </button>
                <input
                  id="fileInputFont"
                  type="file"
                  accept=".gif, .png, .jpg"
                  style={{ display: 'none' }}
                  onChange={(event) => handleFileChange(event, setPreviewFront)}
                />
                <p className="ml-5 w-56 mr-1">Ảnh .GIF, .PNG hoặc .JPG không quá 10Mb</p>
                <div className="ml-10 w-60 h-32 border border-gray-300 rounded-lg overflow-hidden flex-shrink-0">
                  {previewFront && (
                    <img src={previewFront} alt="Preview" className="w-full h-full object-cover" />
                  )}
                </div>
              </div>
            </div>

            {/* Ảnh mặt sau giấy chứng thực */}
            <div className="row-span-1 lg:flex items-center">
              <div className="w-36 flex text-left lg:text-right ml-20 lg:ml-12 mr-3">
                <p className="text-textGray0 font-medium text-base">Ảnh mặt sau giấy chứng thực</p>
                <span className="ml-1 text-red-500">*</span>
              </div>
              <div className="flex relative ml-20 lg:ml-0 mt-2 lg:mt-0 items-center">
                <button
                  className="hover:bg-primaryColor hover:text-white rounded-md border border-primaryColor py-2 px-4"
                  onClick={() => document.getElementById("fileInputBack").click()}
                >
                  Chọn ảnh
                </button>
                <input
                  id="fileInputBack"
                  type="file"
                  accept=".gif, .png, .jpg"
                  style={{ display: 'none' }}
                  onChange={(event) => handleFileChange(event, setPreviewBack)}
                />
                <p className="ml-5 w-56 mr-1">Ảnh .GIF, .PNG hoặc .JPG không quá 10Mb</p>
                <div className="ml-10 w-60 h-32 border border-gray-300 rounded-lg overflow-hidden flex-shrink-0">
                  {previewBack && (
                    <img src={previewBack} alt="Preview" className="w-full h-full object-cover" />
                  )}
                </div>
              </div>
            </div>

            {/* Ảnh chân dung chính chủ (cầm CCCD) */}
            <div className="row-span-1 lg:flex items-center">
              <div className="w-48 flex text-left lg:text-right ml-20 lg:ml-0 mr-3">
                <p className="text-textGray0 font-medium text-base">Ảnh chân dung chính chủ (cầm CCCD)</p>
                <span className="ml-1 text-red-500">*</span>
              </div>
              <div className="flex relative ml-20 lg:ml-0 mt-2 lg:mt-0 items-center">
                <button
                  className="hover:bg-primaryColor hover:text-white rounded-md border border-primaryColor py-2 px-4"
                  onClick={handleOpenCamera}
                >
                  Chụp ảnh
                </button>
                <input
                  id="fileInputPortrait"
                  type="file"
                  accept=".gif, .png, .jpg"
                  style={{ display: 'none' }}
                  onChange={(event) => handleFileChange(event)}
                />
                <CameraModal
                  isOpen={isCameraOpen}
                  onClose={handleCloseCamera}
                  onCapture={handleCapture}
                  userID={userID}
                />
                <p className="ml-5 w-56 mr-1">Ảnh .GIF, .PNG hoặc .JPG không quá 10Mb</p>
                <div className="ml-10 w-60 h-32 border border-gray-300 rounded-lg overflow-hidden flex-shrink-0">
                  {capturedImage && (
                    <img src={capturedImage} alt="Captured" className="w-full h-full object-cover" />
                  )}
                </div>
              </div>
            </div>

            {/* ReCAPTCHA */}
            <div className="row-span-1 lg:flex items-center">
              <div className="w-48 flex text-left lg:text-right ml-20 lg:ml-0 mr-3">
                <p className="text-textGray0 font-medium text-base">Tích vào ô vuông để xác thực</p>
              </div>
              <div className="relative lg:w-1/2 w-1/2 ml-20 lg:ml-0 mt-2 lg:mt-0">
                <ReCAPTCHA sitekey="6LesSQ8qAAAAAKqx5VBJpBKKrbX_M4t4cEeHsa-e" 
                  onChange={handleCaptchaChange}
                />
              </div>
            </div>

          </div>
          <div className="w-full h-auto bg-gray-100 rounded-md py-1 mt-9">
            <div className="mx-5 my-3">
              <p className="text-primaryColor font-semibold text-base">Chú ý:</p>
              <p className="text-black font-normal text-base">Đối với khách hàng là công dân dưới 14 tuổi, vui lòng liên hệ đến Ngân Lượng để được hỗ trợ xác minh.</p>
              <p className="text-black font-normal text-base">Hotline: 1900 585899</p>
              <p className="text-black font-normal text-base">Email: support@ewallet.vn</p>
            </div>
          </div>

          <div className="flex items-center mt-6 justify-end">
            <button
              className="hover:bg-primaryColor hover:text-white text-primaryColor rounded-md border mb-3 lg:mb-0 border-primaryColor py-2 px-4 font-medium"
              onClick={handleBack}
            >
              Quay lại
            </button>
            <button
              className="rounded-md border mb-3 lg:mb-0 bg-primaryColor text-white font-medium py-2 px-4 ml-2"
              onClick={handleSubmit}
            >
              Gửi yêu cầu
            </button>
          </div>
          {showSuccessModal && (
                <TicketRequestSuccess onClose={() => setShowSuccessModal(false)} />
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default ManualIdentityAuth;