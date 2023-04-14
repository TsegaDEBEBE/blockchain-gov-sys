import './App.css';
import LinkButton from './components/linkButton';
import Logo from "./images/logo-hilcoe.jpg";
function App() {
  return (
    <div className="h-screen select-none bg-[#b2c8f0]">
      <header className="flex flex-col items-center p-2">
        <img src={Logo} alt="HiLCoE Logo" className="p-2" />
        <p className="text-6xl text-center">HiLCoE</p>
        <p className="text-2xl text-center">
          School of Computer Science & Technology
        </p>
        <p className="text-3xl mt-6 text-center">
          The use of Blockchain for Government Data Management
        </p>
        <p className="text-2xl w-10/12 text-end mt-4">
          Thesis by Tsega Debebe Worku
        </p>
        <p className="text-1xl w-10/12 text-end">
          Advised by Mesfin Belachew (PhD)
        </p>
      </header>
      <div className="flex justify-evenly flex-wrap">
        <LinkButton text="Add a new Token" link="add" symbol="+" />
        <LinkButton text="Verify a Token" link="verify" symbol="✓" />
        <LinkButton text="Show Blockchain" link="show" symbol="∞" />
      </div>
    </div>
  );
}

export default App;
