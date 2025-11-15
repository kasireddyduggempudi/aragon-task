import React from 'react';
import './Textarea.css';

const Textarea = ({ 
  label, 
  value, 
  onChange, 
  placeholder, 
  error,
  rows = 4,
  name
}) => {
  return (
    <div className="textarea-group">
      {label && <label className="textarea-label">{label}</label>}
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        className={`textarea ${error ? 'textarea-error' : ''}`}
      />
      {error && <span className="error-message">{error}</span>}
    </div>
  );
};

export default Textarea;
