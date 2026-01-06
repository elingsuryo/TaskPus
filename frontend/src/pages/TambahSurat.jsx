import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SelectModal from "../components/SelectModal";
import api from "../service/api";
import "./TambahSurat.css";

function TambahSurat() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nosu: "",
    tanggal_buat: "",
    lama: 1,
    tanggal_kegiatan: "",
    tanggal_selesai: "",
    kepala_id: "",
    jumlah_petugas: "",
    jenis_perjadin: "",
    dalam_rangka: "",
    atas_nama: "",
    tempat: "",
  });

  const [petugasForm, setPetugasForm] = useState([]);
  const [kepalaList, setKepalaList] = useState([]);
  const [petugasList, setPetugasList] = useState([]);
  const [rangkaList, setRangkaList] = useState([]);
  const [tempatList, setTempatList] = useState([]);
  const [errors, setErrors] = useState({});

  // ================= LOAD MASTER =================
  useEffect(() => {
    api.get("/tambah-surat/master").then((res) => {
      setKepalaList(res.data.kepala);
      setPetugasList(res.data.petugas);
      setRangkaList(res.data.rangka);
      setTempatList(res.data.tempat);
    });
  }, []);

  // ================= EDIT MODE =================
  useEffect(() => {
    if (!isEdit) {
      const today = new Date().toISOString().split("T")[0];
      setForm((prev) => ({
        ...prev,
        tanggal_buat: today,
        tanggal_kegiatan: today,
        tanggal_selesai: today,
      }));
      return;
    }

    api.get(`/surat/${id}`).then((res) => {
      setForm(res.data);
      setPetugasForm(res.data.petugas || []);
    });
  }, [id, isEdit]);

  // ================= PETUGAS DINAMIS =================
  useEffect(() => {
    const jumlah = Number(form.jumlah_petugas || 0);
    setPetugasForm((prev) => {
      const copy = [...prev];
      if (copy.length < jumlah) {
        for (let i = copy.length; i < jumlah; i++) copy.push("");
      } else {
        copy.length = jumlah;
      }
      return copy;
    });
  }, [form.jumlah_petugas]);

  const setValue = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const setPetugasValue = (index, value) => {
    const updated = [...petugasForm];
    updated[index] = value;
    setPetugasForm(updated);
  };

  // ================= VALIDASI =================
  const validateForm = () => {
    const err = {};
    if (!form.nosu) err.nosu = "NOSU wajib diisi";
    if (!form.kepala_id) err.kepala_id = "Kepala wajib dipilih";
    if (!form.jumlah_petugas) err.jumlah_petugas = "Jumlah petugas wajib";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  // ================= SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const payload = {
      ...form,
      petugas: petugasForm,
    };

    try {
      if (isEdit) {
        await api.put(`/surat/${id}`, payload);
        alert("Surat berhasil diperbarui");
      } else {
        await api.post("/surat", payload);
        alert("Surat berhasil ditambahkan");
      }
      navigate("/data-surat");
    } catch {
      alert("Gagal menyimpan surat");
    }
  };

  return (
    <div className="form-wrapper">
      <h1>{isEdit ? "Edit Surat Tugas" : "Tambah Surat Tugas"}</h1>

      <form onSubmit={handleSubmit}>
        <label>NOSU*</label>
        <input
          type="number"
          value={form.nosu}
          disabled={isEdit}
          onChange={(e) => setValue("nosu", e.target.value)}
        />
        {errors.nosu && <small className="error">{errors.nosu}</small>}

        <label>Tanggal Buat</label>
        <input
          type="date"
          value={form.tanggal_buat}
          onChange={(e) => setValue("tanggal_buat", e.target.value)}
        />

        <label>Lama</label>
        <div className="lama-wrapper">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              type="button"
              key={n}
              className={form.lama === n ? "active" : ""}
              onClick={() => setValue("lama", n)}
            >
              {n}
            </button>
          ))}
        </div>

        <label>Kepala Puskesmas*</label>
        <select
          value={form.kepala_id}
          onChange={(e) => setValue("kepala_id", e.target.value)}
        >
          <option value="">-- Pilih --</option>
          {kepalaList.map((k) => (
            <option key={k.id} value={k.id}>
              {k.nama}
            </option>
          ))}
        </select>

        <SelectModal
          label="Jumlah Petugas"
          value={form.jumlah_petugas}
          options={["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]}
          onSelect={(v) => setValue("jumlah_petugas", v)}
        />

        {petugasForm.map((val, i) => (
          <div key={i}>
            <label>Petugas {i + 1}</label>
            <select
              value={val}
              onChange={(e) => setPetugasValue(i, e.target.value)}
            >
              <option value="">-- Pilih --</option>
              {petugasList.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.nama}
                </option>
              ))}
            </select>
          </div>
        ))}

        <SelectModal
          label="Dalam Rangka"
          value={form.dalam_rangka}
          options={rangkaList}
          onSelect={(v) => setValue("dalam_rangka", v)}
        />

        <SelectModal
          label="Tempat"
          value={form.tempat}
          options={tempatList}
          onSelect={(v) => setValue("tempat", v)}
        />

        <button className="submit-btn">Simpan</button>
      </form>
    </div>
  );
}

export default TambahSurat;
