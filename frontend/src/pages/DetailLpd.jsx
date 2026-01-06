import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../service/api";
import "./DetailLpd.css";

function DetailLpd() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  /* 📡 FETCH DETAIL LPD */
  const fetchDetail = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/lpd/${id}`);
      setData(res.data.data ?? res.data);
    } catch (err) {
      console.error("Gagal ambil detail lpd", err);
      alert("Detail lpd tidak ditemukan");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetail();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!data) return <p>Data tidak tersedia</p>;

  return (
    <div className="detaillpd-wrapper">
      <div className="detail-lpd-card">
        <div className="detail-lpd-header">
          <h2>Detail LPD</h2>
        </div>

        <div className="detail-grid">
          <Field label="NOSU" value={data.id} />
          <Field label="Tanggal Buat" value={data.tanggal_buat} />
          <Field label="Lama" value={`${data.lama} Hari`} />
          <Field label="Tanggal Kegiatan" value={data.tanggal_mulai} />
          <Field label="Tanggal Selesai" value={data.tanggal_selesai} />
          <Field label="Kepala Puskesmas" value={data.kepala_puskesmas} />
          <Field label="Jumlah Petugas" value={data.jumlah_petugas} />
          <Field label="Jenis Perjadin" value={data.jenis_perjadin} />
          <Field label="Dalam Rangka" value={data.dalam_rangka} />
          <Field label="Tempat" value={data.tempat} />
        </div>

        {/* FLOAT BUTTON EDIT */}
        <button
          className="fab"
          onClick={() => navigate(`/form-lpd/${data.id}`)}
          title="Isi Data LPD"
        >
          ✏️
        </button>
      </div>
    </div>
  );
}

export default DetailLpd;

/* ===================== COMPONENT ===================== */

function Field({ label, value }) {
  return (
    <div className="detail-row">
      <div className="detail-label">{label}</div>
      <div className="detail-separator">:</div>
      <div className="detail-value">{value || "-"}</div>
    </div>
  );
}
