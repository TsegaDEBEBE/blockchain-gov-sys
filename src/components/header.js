import Logo from "../images/logo-hilcoe.jpg";
import { Link } from "react-router-dom";

function Header({ text, link, symbol }) {
  return (
    <Link to={"/"}>
      <header className="flex flex-col items-center p-2">
        <img src={Logo} alt="HiLCoE Logo" className="p-2" />
        <p className="text-3xl mt-6 text-center mb-8">
          A Blockchain-Based Approach for Government Document Verification
        </p>
      </header>
    </Link>
  );
}

export default Header;
