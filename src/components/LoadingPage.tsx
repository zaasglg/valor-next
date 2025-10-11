export default function LoadingPage() {
  return (
    <div className="min-h-screen bg-white absolute top-0 left-0 w-full h-full z-50 flex flex-col justify-center items-center">

        <img src="https://valor.bet/logo.svg" alt="logo" width={200} height={100} />
      <div className="global-loader mt-10">
        <div className="global-loader__box">
          <div className="global-loader__inner global-loader__inner_one"></div>
          <div className="global-loader__inner global-loader__inner_two"></div>
          <div className="global-loader__inner global-loader__inner_three"></div>
        </div>
      </div>
    </div>
  );
}
