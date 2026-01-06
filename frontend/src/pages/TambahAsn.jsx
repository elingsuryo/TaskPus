import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SelectModal from "../components/SelectModal";
import api from "../service/api";
import "./TambahAsn.css";

function TambahAsn() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nama_asn: "",
    nip: "",
    pangkat: "",
    jabatan: "",
    unit_kerja: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // ===============================
  // MASTER DATA
  // ===============================
  const PangkatList = [
    "Pengatur Muda / II a",
    "Pengatur Muda Tingkat I / II b",
    "Pengatur / II c",
    "Pengatur Tingkat I / II d",
    "Penata Muda / III a",
    "Penata Muda Tingkat I / III b",
    "Penata / III c",
    "Penata Tingkat I / III d",
    "Pembina / IV a",
    "Pembina Tingkat I / IV b",
    "Pembina Utama Muda / IV c",
    "Pembina Utama Madya / IV d",
    "Pembina Utama / IV e",
  ];

  const unitKerjaList = [
    "Desa Batu Belaman",
    "Desa Kubu",
    "Desa Sungai Bedaun",
    "Desa Sungai Kapitan",
    "Kelurahan Kumai Hilir",
    "Kelurahan Kumai Hulu",
    "UPTD Puskesmas Kumai",
  ];

  // ===============================
  // HELPERS
  // ===============================
  const setValue = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const validateForm = () => {
    const err = {};
    if (!form.nama_asn) err.nama_asn = "Nama ASN wajib diisi";
    if (!form.nip) err.nip = "NIP wajib diisi";
    if (!form.pangkat) err.pangkat = "Pangkat wajib diisi";
    if (!form.jabatan) err.jabatan = "Jabatan wajib diisi";
    if (!form.unit_kerja) err.unit_kerja = "Unit kerja wajib diisi";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  // ===============================
  // SUBMIT
  // ===============================
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setLoading(true);

      await api.post("/asn", form);

      alert("Data ASN berhasil disimpan");
      navigate("/data-asn");
    } catch (err) {
      console.error("Gagal simpan ASN", err);
      alert("Gagal menyimpan data ASN");
    } finally {
      setLoading(false);
    }
  };

  // ===============================
  // RENDER
  // ===============================
  return (
    <div className="form-wrapper">
      <h1>Tambah ASN</h1>

      <form onSubmit={handleSubmit}>
        {/* Nama ASN */}
        <label>Nama ASN *</label>
        <input
          type="text"
          value={form.nama_asn}
          onChange={(e) => setValue("nama_asn", e.target.value)}
        />
        {errors.nama_asn && <small className="error">{errors.nama_asn}</small>}

        {/* NIP */}
        <label>NIP *</label>
        <input
          type="text"
          value={form.nip}
          onChange={(e) => setValue("nip", e.target.value)}
        />
        {errors.nip && <small className="error">{errors.nip}</small>}

        {/* Pangkat */}
        <SelectModal
          label="Pangkat *"
          value={form.pangkat}
          options={PangkatList}
          onSelect={(val) => setValue("pangkat", val)}
        />
        {errors.pangkat && <small className="error">{errors.pangkat}</small>}

        {/* Jabatan */}
        <label>Jabatan *</label>
        <input
          type="text"
          value={form.jabatan}
          onChange={(e) => setValue("jabatan", e.target.value)}
        />
        {errors.jabatan && <small className="error">{errors.jabatan}</small>}

        {/* Unit Kerja */}
        <SelectModal
          label="Unit Kerja *"
          value={form.unit_kerja}
          options={unitKerjaList}
          onSelect={(val) => setValue("unit_kerja", val)}
        />
        {errors.unit_kerja && (
          <small className="error">{errors.unit_kerja}</small>
        )}

        <button className="submit-btn" type="submit" disabled={loading}>
          {loading ? "Menyimpan..." : "Simpan"}
        </button>
      </form>
    </div>
  );
}

export default TambahAsn;
