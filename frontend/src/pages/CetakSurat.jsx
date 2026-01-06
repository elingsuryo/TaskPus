import { useState, useEffect } from "react";
import SelectModal from "../components/SelectModal";
import api from "../service/api";
import "./CetakSurat.css";

function CetakSurat() {
  const [nosu, setNosu] = useState("");
  const [nosuList, setNosuList] = useState([]);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🔹 ambil list NOSU dari backend
  useEffect(() => {
    const fetchNosu = async () => {
      try {
        const res = await api.get("/surat");
        // ambil ID saja buat dropdown
        const ids = res.data.map((item) => item.id);
        setNosuList(ids);
      } catch (err) {
        console.error("Gagal ambil NOSU:", err);
      }
    };

    fetchNosu();
  }, []);

  // 🔹 pilih NOSU → ambil detail surat
  const handleSelectNosu = async (id) => {
    setNosu(id);
    setLoading(true);

    try {
      const res = await api.get(`/surat/${id}`);
      setData(res.data);
    } catch (err) {
      console.error("Gagal ambil detail surat:", err);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cetak-wrapper">
      <SelectModal
        label="NOSU"
        value={nosu}
        options={nosuList}
        onSelect={handleSelectNosu}
      />

      {loading && <p>Loading surat...</p>}

      {data && !loading && <PreviewSurat data={data} />}
    </div>
  );
}

export default CetakSurat;

// ================= PREVIEW =================

function PreviewSurat({ data }) {
  return (
    <div className="preview-card">
      <div className="row">
        <span>NOSU</span>
        <strong>{data.id}</strong>
      </div>

      <div className="row">
        <span>TGL BUAT</span>
        <strong>{data.tanggal_buat}</strong>
      </div>

      <div className="row">
        <span>PIMPINAN</span>
        <strong>{data.pimpinan}</strong>
      </div>

      {Array.isArray(data.petugas) &&
        data.petugas.map((p, i) => (
          <div className="row" key={i}>
            <span>PETUGAS {i + 1}</span>
            <strong>{p}</strong>
          </div>
        ))}

      <button className="btn-cetak" onClick={() => window.print()}>
        🖨️ CETAK SURAT
      </button>
    </div>
  );
}
