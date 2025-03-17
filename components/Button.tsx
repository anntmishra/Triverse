import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "outline";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  className = "",
  onClick,
  type = "button",
  disabled = false,
}) => {
  const baseClass = variant === "primary" ? "btn-primary" : "btn-outline";

  return (
    <button
      type={type}
      className={`${baseClass} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
      <style jsx>{`
        .btn-primary {
          display: inline-block;
          padding: 0.5rem 1.5rem;
          background-color: rgba(234, 142, 234, 0.6);
          color: white;
          border-radius: 9999px;
          font-weight: 500;
          transition: all 0.3s ease;
          cursor: pointer;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
            0 2px 4px -2px rgba(0, 0, 0, 0.1);
        }

        .btn-primary:hover {
          background-color: rgba(234, 142, 234, 0.8);
          transform: translateY(-2px);
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
            0 4px 6px -4px rgba(0, 0, 0, 0.1);
        }

        .btn-outline {
          display: inline-block;
          padding: 0.5rem 1.5rem;
          background-color: transparent;
          color: white;
          border: 1px solid rgba(234, 142, 234, 0.6);
          border-radius: 9999px;
          font-weight: 500;
          transition: all 0.3s ease;
          cursor: pointer;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
            0 2px 4px -2px rgba(0, 0, 0, 0.1);
        }

        .btn-outline:hover {
          background-color: rgba(234, 142, 234, 0.1);
          transform: translateY(-2px);
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
            0 4px 6px -4px rgba(0, 0, 0, 0.1);
        }

        button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }
      `}</style>
    </button>
  );
};

export default Button;
