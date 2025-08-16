import React from 'react';

//polje za unos
function InputField({ label, type = "text", value, onChange, placeholder }) {
  return (
    <div style={{ marginBottom: "10px" }}>
      <label style={{ display: "block", marginBottom: "5px" }}>
        {label}
      </label>
      <input
        type={type}                
        value={value}              
        onChange={onChange}        
        placeholder={placeholder}  
        style={{
          width: "100%",
          padding: "8px",
          border: "1px solid #ccc",
          borderRadius: "4px"
        }}
      />
    </div>
  );
}

export default InputField;