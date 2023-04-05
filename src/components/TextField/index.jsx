import "./style.css";

const TextField = ({
  name,
  value,
  onChange,
  placeholder,
  helperText,
  error,
}) => {
  return (
    <>
      <div className="input-container">
        <input
          value={value}
          name={name}
          onChange={onChange}
          placeholder={placeholder}
          className={`${error ? "error-color" : ""}`}
        />
      </div>
      {error && <span className="error-text">{helperText}</span>}
    </>
  );
};
export default TextField;
