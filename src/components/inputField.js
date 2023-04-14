function InputField({
  label,
  name,
  value,
  onChange,
  onInput,
  placeholder,
  type = "text",
  accept,
  disabled,
}) {
  return (
    <div className="relative flex flex-col-reverse w-full">
      <input
        onInput={onInput}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        type={type}
        placeholder={placeholder}
        aria-label={label}
        className={`peer w-full pb-1 pt-6 px-3 text-base rounded-lg border border-gray-400 focus:border-red-400 text-gray-600 bg-white focus:outline-none focus:ring-0 appearance-none transition-colors duration-300 ${
          disabled ? "bg-gray-200" : ""
        }`}
        accept={accept}
        disabled={disabled}
      />
      <label
        htmlFor={name}
        className="absolute top-0 items-center px-3 pt-2 text-xs peer-focus:font-semibold peer-focus:text-red-400 uppercase text-gray-600 bg-transparent transition-colors duration-300"
      >
        {label}
      </label>
    </div>

    // <div
    //   className={`flex items-stretch w-full overflow-hidden bg-white shadow-[0_4px_10px_rgba(0,0,0,0.03)] ${className}`}
    // >
    //   <input
    //     id={name}
    //     name={name}
    //     value={value}
    //     type={type}
    //     placeholder={label}
    //     aria-label={label}
    //     onChange={onChange}
    //     pattern={pattern}
    //     className={`peer block w-full py-1 px-3 text-gray-600 focus:outline-none  border border-gray-400 focus:border-black focus:ring-0 appearance-none ${
    //       disabled ? "bg-gray-200" : ""
    //     } ${inputClassName}`}
    //     disabled={disabled}
    //   />
    //   <label
    //     htmlFor={name}
    //     className="absolute top-0 items-center px-3 pt-2 text-xs peer-focus:font-semibold peer-focus:text-red-400 uppercase text-gray-600 bg-transparent transition-colors duration-300"
    //   >
    //     {label}
    //   </label>
    // </div>
  );
}
export default InputField;