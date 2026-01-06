import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SelectModal from "../components/SelectModal";
import api from "../service/api";
import "./TambahPetugasLain.css";

function TambahPetugasLain() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nama_staf: "",
    nip: "",
    pangkat: "",
    jabatan: "",
    unit_kerja_id: "",
  });

  const [unitKerjaList, setUnitKerjaList] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Ambil Unit Kerja dari backend
  useEffect(() => {
    api
      .get("/unit-kerja")
      .then((res) => setUnitKerjaList(res.data))
      .catch(() => alert("Gagal memuat data Unit Kerja"));
  }, []);

  const setValue = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.nama_staf) newErrors.nama_staf = "Nama Staf wajib diisi";
    if (!form.nip) newErrors.nip = "NIP wajib diisi";
    if (!form.pangkat) newErrors.pangkat = "Pangkat wajib diisi";
    if (!form.jabatan) newErrors.jabatan = "Jabatan wajib diisi";
    if (!form.unit_kerja_id)
      newErrors.unit_kerja_id = "Unit Kerja wajib dipilih";

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
      await api.post("/petugas-lain", form);
      alert("Data Petugas Lain berhasil disimpan");
      navigate("/data-petugaslain");
    } catch (error) {
      alert("Gagal menyimpan data Petugas Lain");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-wrapper">
      <h1>Tambah Petugas Lain</h1>

      <form onSubmit={handleSubmit}>
        <label>Nama Staf*</label>
        <input
          type="text"
          value={form.nama_staf}
          onChange={(e) => setValue("nama_staf", e.target.value)}
        />
        {errors.nama_staf && (
          <small className="error">{errors.nama_staf}</small>
        )}

        <label>NIP*</label>
        <input
          type="text"
          value={form.nip}
          onChange={(e) => setValue("nip", e.target.value)}
        />
        {errors.nip && <small className="error">{errors.nip}</small>}

        <label>Pangkat*</label>
        <input
          type="text"
          value={form.pangkat}
          onChange={(e) => setValue("pangkat", e.target.value)}
        />
        {errors.pangkat && <small className="error">{errors.pangkat}</small>}

        <label>Jabatan*</label>
        <input
          type="text"
          value={form.jabatan}
          onChange={(e) => setValue("jabatan", e.target.value)}
        />
        {errors.jabatan && <small className="error">{errors.jabatan}</small>}

        <SelectModal
          label="Unit Kerja*"
          value={form.unit_kerja_id}
          options={unitKerjaList}
          optionLabel="nama_unit"
          optionValue="id"
          onSelect={(val) => setValue("unit_kerja_id", val)}
        />
        {errors.unit_kerja_id && (
          <small className="error">{errors.unit_kerja_id}</small>
        )}

        <button className="submit-btn" type="submit" disabled={loading}>
          {loading ? "Menyimpan..." : "Simpan"}
        </button>
      </form>
    </div>
  );
}

export default TambahPetugasLain;
