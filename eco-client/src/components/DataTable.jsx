import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/eco";

function DataTable() {
  const [indicators, setIndicators] = useState([]);
  const [form, setForm] = useState({
    city: "",
    airQuality: "",
    waterQuality: "",
    noiseLevel: ""
  });
  const [editingId, setEditingId] = useState(null); //  ID запису, який редагуємо

  const fetchData = async () => {
    const res = await axios.get(API_URL);
    setIndicators(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  //  Додавання або оновлення
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingId) {
      // Якщо ми редагуємо існуючий запис
      await axios.put(`${API_URL}/${editingId}`, form);
      setEditingId(null);
    } else {
      // Якщо створюємо новий
      await axios.post(API_URL, form);
    }

    setForm({ city: "", airQuality: "", waterQuality: "", noiseLevel: "" });
    fetchData();
  };

  //  Заповнити форму для редагування
  const handleEdit = (indicator) => {
    setEditingId(indicator._id);
    setForm({
      city: indicator.city,
      airQuality: indicator.airQuality,
      waterQuality: indicator.waterQuality,
      noiseLevel: indicator.noiseLevel
    });
  };

  //  Видалити
  const handleDelete = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchData();
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Екологічні показники</h2>

      {/* Форма */}
      <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
        <input
          type="text"
          placeholder="Місто"
          value={form.city}
          onChange={(e) => setForm({ ...form, city: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Якість повітря"
          value={form.airQuality}
          onChange={(e) => setForm({ ...form, airQuality: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Якість води"
          value={form.waterQuality}
          onChange={(e) => setForm({ ...form, waterQuality: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Рівень шуму"
          value={form.noiseLevel}
          onChange={(e) => setForm({ ...form, noiseLevel: e.target.value })}
          required
        />
        <button type="submit">
          {editingId ? "Зберегти зміни" : " Додати"}
        </button>
        {editingId && (
          <button
            type="button"
            onClick={() => {
              setEditingId(null);
              setForm({ city: "", airQuality: "", waterQuality: "", noiseLevel: "" });
            }}
            style={{ marginLeft: 10 }}
          >
            Скасувати
          </button>
        )}
      </form>

      {/*Таблиця */}
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Місто</th>
            <th>Якість повітря</th>
            <th>Якість води</th>
            <th>Рівень шуму</th>
            <th>Дата</th>
            <th>Дії</th>
          </tr>
        </thead>
        <tbody>
          {indicators.map((i) => (
            <tr key={i._id}>
              <td>{i.city}</td>
              <td>{i.airQuality}</td>
              <td>{i.waterQuality}</td>
              <td>{i.noiseLevel}</td>
              <td>{new Date(i.date).toLocaleDateString()}</td>
              <td>
                <button onClick={() => handleEdit(i)}>✏️ Редагувати</button>{" "}
                <button onClick={() => handleDelete(i._id)}>🗑️ Видалити</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
