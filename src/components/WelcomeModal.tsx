import appLogoLg from "@/assests/svg/appLogoLg.svg";
const WelcomeModal = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="text-center text-4xl font-extrabold font-bricolage-grotesque">
        Welcome to !!
      </div>
      <div className="mt-[36px]">
        <img src={appLogoLg} alt="app logo" />
      </div>
    </div>
  );
};

export default WelcomeModal;
