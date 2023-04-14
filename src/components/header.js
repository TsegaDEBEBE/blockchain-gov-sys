import Logo from "../images/logo-hilcoe.jpg";
import { Link } from "react-router-dom";

function Header({ text, link, symbol }) {
  return (
    <Link to={"/"}>
      <header className="flex flex-wrap justify-center bg-[#b2c8f0]">
        <img src={Logo} alt="HiLCoE Logo" className="p-2" />
        <p className="text-3xl mt-6 text-center mb-8">
          The use of Blockchain for Government Data Management
        </p>
      </header>
    </Link>
  );
}

export default Header;
