const UnAuthorized = () => {
  return (
      <section className="bg-white min-h-screen flex  justify-center align-center dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto flex align-center justify-center max-w-screen-xl lg:py-16 lg:px-6">
          <div className="mx-auto max-w-screen-sm text-center">
            <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-green-500">403</h1>
            <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">Bạn
              không có quyền truy cập trang này.</p>
            <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400"></p>
            <a href="#"
               className="inline-flex hover:text-white focus:text-white hover:no-underline focus:no-underline text-white hover:bg-green-600 bg-green-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center my-4">Về
              trang chủ</a>
          </div>
        </div>
      </section>);
};

export default UnAuthorized;