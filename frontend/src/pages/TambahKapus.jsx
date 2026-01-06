import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SelectModal from "../components/SelectModal";
import api from "../service/api";
import "./TambahKapus.css";

function TambahKapus() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nama_kepala: "",
    nip: "",
    golongan_id: "",
    jabatan: "",
    keterangan: "",
  });

  const [golonganList, setGolonganList] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // ================= LOAD GOLONGAN =================
  useEffect(() => {
    api
      .get("/golongan")
      .then((res) => setGolonganList(res.data))
      .catch(() => alert("Gagal memuat data golongan"));
  }, []);

  const setValue = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  // ================= VALIDASI =================
  const validateForm = () => {
    const err = {};
    if (!form.nama_kepala) err.nama_kepala = "Nama wajib diisi";
    if (!form.nip) err.nip = "NIP wajib diisi";
    if (!form.golongan_id) err.golongan_id = "Golongan wajib dipilih";
    if (!form.jabatan) err.jabatan = "Jabatan wajib diisi";
    if (!form.keterangan) err.keterangan = "Keterangan wajib diisi";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  // ================= SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      await api.post("/kapus", form);
      alert("Data Kepala Puskesmas berhasil disimpan");
      navigate("/data-kapus");
    } catch (err) {
      alert(err.response?.data?.message || "Gagal menyimpan data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-wrapper">
      <h1>Tambah Kepala Puskesmas</h1>

      <form onSubmit={handleSubmit}>
        <label>Nama Kepala*</label>
        <input
          value={form.nama_kepala}
          onChange={(e) => setValue("nama_kepala", e.target.value)}
        />
        {errors.nama_kepala && (
          <small className="error">{errors.nama_kepala}</small>
        )}

        <label>NIP*</label>
        <input
          value={form.nip}
          onChange={(e) => setValue("nip", e.target.value)}
        />
        {errors.nip && <small className="error">{errors.nip}</small>}

        <SelectModal
          label="Golongan*"
          value={form.golongan_id}
          options={golonganList}
          optionLabel="golongan"
          optionValue="id"
          onSelect={(val) => setValue("golongan_id", val)}
        />
        {errors.golongan_id && (
          <small className="error">{errors.golongan_id}</small>
        )}

        <label>Jabatan*</label>
        <input
          value={form.jabatan}
          onChange={(e) => setValue("jabatan", e.target.value)}
        />
        {errors.jabatan && <small className="error">{errors.jabatan}</small>}

        <label>Keterangan*</label>
        <input
          value={form.keterangan}
          onChange={(e) => setValue("keterangan", e.target.value)}
        />
        {errors.keterangan && (
          <small className="error">{errors.keterangan}</small>
        )}

        <button className="submit-btn" disabled={loading}>
          {loading ? "Menyimpan..." : "Simpan"}
        </button>
      </form>
    </div>
  );
}

export default TambahKapus;
