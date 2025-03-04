import { useNavigate } from "react-router-dom";

export function PageNotFound() {
  const navigate = useNavigate();
  const handleReturnHome = () => {
    navigate("/");
  };

  return (
    <div className={"h-screen w-full p-10 flex justify-center items-center"}>
      <div className={"w-full flex flex-col justify-center items-center"}>
        <img
          src="/404.svg"
          className={"h-full w-full sm:w-2/3 md:w-1/3"}
          alt="404"
        />
        <button
          onClick={handleReturnHome}
          className={
            "bg-blue-500 hover:bg-blue-700 text-sm md:text-base text-white font-bold py-2 px-4 rounded-full"
          }
        >
          Quay về trang chủ
        </button>
      </div>
    </div>
  );
}
