
function AddFormButton({ text, onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-transparent text-blue-700 font-semibold py-2 px-4 border-2 border-dashed border-blue-500 hover:border-solid hover:scale-105 rounded m-3 transition-all w-72 h-32"
    >
      <p className="text-2xl">{text}</p>
    </button>
  );
}

export default AddFormButton;
