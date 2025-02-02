interface CustomAlertProps {
  title: string;
  message: string;
  buttonText: string;
  onClose: () => void;
}

const CustomAlert: React.FC<CustomAlertProps> = ({ title, message, buttonText, onClose }) => {
  return (
    <div className="customAlert">
      <h2>{title}</h2>
      <p>{message}</p>
      <button onClick={onClose}>{buttonText}</button>
    </div>
  );
};

export default CustomAlert;
