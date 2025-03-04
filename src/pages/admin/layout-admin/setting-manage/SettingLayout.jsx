import SettingAdmin from "./SettingAdmin.jsx";

const SettingLayout = () => {
    return (
        <div>
            <div className="min-h-screen bg-gray-100 p-6">
                <div>
                    {/*Chia nhỏ Component rồi vào đây để dễ quản lý không code quá nhiều trong Layout này.*/}
                    <SettingAdmin/>
                </div>
            </div>
        </div>
    );
};

export default SettingLayout;