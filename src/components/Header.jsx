import { GoPerson } from "react-icons/go";

const Header = () => {
  return (
    <header className="bg-[#9a5ea7] p-4 flex items-center justify-between w-full mx-2 mt-2 rounded-lg shadow-lg top-0 left-0 right-0">
      <h1 className="text-white text-5xl font-bold text-center font-dancing">
        Floralize
      </h1>
      <div className="flex items-center">
        <GoPerson className="text-white text-4xl transition-colors duration-300 hover:text-[#fbc02d]" />
      </div>
    </header>
  );
};

export default Header;

