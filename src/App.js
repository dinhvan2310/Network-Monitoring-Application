import React, { useState } from 'react';

function App() {
  const [formData, setFormData] = useState({
    id: '',
    oid: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý dữ liệu khi form được gửi đi, ví dụ: gửi dữ liệu lên máy chủ
    fetch(`http://localhost:8080/snmp/${formData.id}/${formData.oid}}`)
      .then(response => response.json())
      .then(data => console.log(data));
    console.log("Dữ liệu được gửi đi:", formData);
    
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          id="id"
          name="id"
          value={formData.id}
          onChange={handleChange}
        />
      </div>
      <div>
        <input
          type="password"
          id="oid"
          name="oid"
          value={formData.oid}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Get</button>
    </form>
  );
}

export default App;
