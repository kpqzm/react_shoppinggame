import "./Button.css";

const Button = ({ text, type, onClick, disabled }) => {
  return (
    <button onClick={onClick} className={`${type}`} disabled={disabled}>
      {text}
    </button>
  );
};

export default Button;
