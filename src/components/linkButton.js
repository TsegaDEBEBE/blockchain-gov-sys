import { Link } from "react-router-dom";

function LinkButton({ text, link, symbol }) {
  return (
    <Link to={"/" + link} className="h-fit">
      <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border-2 border-blue-500 hover:border-transparent hover:scale-105 rounded m-3 transition-all w-72 h-40">
        <p className="text-6xl mb-5">{symbol}</p>
        <p className="text-2xl">{text}</p>
      </button>
    </Link>
  );
}

export default LinkButton;
