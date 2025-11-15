import React from 'react';
import './Input.css';

const Input = ({ 
  label, 
  value, 
  onChange, 
  placeholder, 
  error, 
  type = 'text',
  required = false,
  name
}) => {
  return (
    <div className="input-group">
      {label && (
        <label className="input-label">
          {label}
          {required && <span className="required">*</span>}
        </label>
      )}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`input ${error ? 'input-error' : ''}`}
        required={required}
      />
      {error && <span className="error-message">{error}</span>}
    </div>
  );
};

export default Input;
