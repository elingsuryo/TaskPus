import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../service/api";
import "./TambahGolongan.css";

function TambahGolongan() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    golongan: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const setValue = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.golongan.trim()) {
      newErrors.golongan = "Nama golongan wajib diisi";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      alert("Lengkapi data yang wajib diisi");
      return;
    }

    setLoading(true);

    try {
      await api.post("/golongan", form);

      alert("Data Golongan berhasil disimpan");
      navigate("/golongan");
    } catch (error) {
      alert(error.response?.data?.message || "Gagal menyimpan data golongan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-wrapper">
      <h1>Tambah Golongan</h1>

      <form onSubmit={handleSubmit}>
        <label>Golongan*</label>
        <input
          type="text"
          value={form.golongan}
          onChange={(e) => setValue("golongan", e.target.value)}
          placeholder="Contoh: III A"
        />
        {errors.golongan && <small className="error">{errors.golongan}</small>}

        <button className="submit-btn" type="submit" disabled={loading}>
          {loading ? "Menyimpan..." : "Simpan"}
        </button>
      </form>
    </div>
  );
}

export default TambahGolongan;
