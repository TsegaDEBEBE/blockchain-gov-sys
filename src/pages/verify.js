import Header from "../components/header";
import InputField from "../components/inputField";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Verify() {
  const [searchText, setSearchText] = useState("");
  
  const navigate = useNavigate();

  function setHexValue(e) {
    let char = e.target.value[e.target.value.length - 1];
    if (
      e.target.value.length <= 32 &&
      ((char >= "a" && char <= "f") ||
        (char >= "0" && char <= "9") ||
        char === undefined)
    ) {
      setSearchText(e.target.value);
    }
  }

  function search() {
    if (searchText.length === 32) {
      let navigateTo = "/verify/" + searchText;
      navigate(navigateTo);
    }
  }

  return (
    <div>
      <div>
        <Header />
      </div>
      <div className="flex flex-wrap justify-center p-6 w-screen">
        <InputField
          name="tokenid"
          label="Token-ID"
          type="text"
          value={searchText}
          onChange={(e) => setHexValue(e)}
        />
        <button
          className="peer w-20 p-3 m-2 text-base rounded-lg border border-gray-400 focus:border-red-400 text-gray-600 bg-white focus:outline-none focus:ring-0 appearance-none transition-colors"
          onClick={() => search()}
        >
          Search
        </button>
      </div>
    </div>
  );
}

export default Verify;
