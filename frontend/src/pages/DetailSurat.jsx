import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../service/api";
import "./DetailSurat.css";

function DetailSurat() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  /* 📡 FETCH DETAIL SURAT */
  const fetchDetail = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/surat/${id}`);
      setData(res.data.data ?? res.data);
    } catch (err) {
      console.error("Gagal ambil detail surat", err);
      alert("Detail surat tidak ditemukan");
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
    <div className="detailsurat-wrapper">
      <div className="detailsurat-card">
        <div className="detailsurat-header">
          <h2>Detail Surat Tugas</h2>
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
          onClick={() => navigate(`/edit-surat/${data.id}`)}
          title="Edit Surat"
        >
          ✏️
        </button>
      </div>
    </div>
  );
}

export default DetailSurat;

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
