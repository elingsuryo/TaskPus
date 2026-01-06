import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../service/api";
import "./DataSurat.css";

function DataSurat() {
  const navigate = useNavigate();

  const [dataSurat, setDataSurat] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);
  const [loading, setLoading] = useState(false);

  /* 🔄 FETCH DATA SURAT */
  const fetchSurat = async () => {
    try {
      setLoading(true);
      const res = await api.get("/surat");
      setDataSurat(res.data);
    } catch (err) {
      console.error("Gagal ambil data surat:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSurat();
  }, []);

  /* 🔍 SEARCH NOSU */
  const filteredData = dataSurat.filter((item) =>
    item.id.toString().toLowerCase().includes(search.toLowerCase())
  );

  /* ☑️ CHECKBOX HANDLER */
  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredData.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredData.map((item) => item.id));
    }
  };

  /* 🗑️ DELETE */
  const handleDelete = async () => {
    if (!selectedIds.length) return;
    if (!window.confirm("Yakin hapus data terpilih?")) return;

    try {
      await Promise.all(selectedIds.map((id) => api.delete(`/surat/${id}`)));
      setSelectedIds([]);
      fetchSurat();
    } catch (err) {
      console.error("Gagal hapus data:", err);
    }
  };

  /* 🔄 REFRESH */
  const handleRefresh = () => {
    setSearch("");
    setSelectedIds([]);
    fetchSurat();
  };

  return (
    <div className="datasurat-wrapper">
      {/* HEADER */}
      <div className="datasurat-header">
        <h2>DATA SURAT TUGAS</h2>

        <div className="header-actions">
          <input
            type="text"
            placeholder="Cari NOSU..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button onClick={handleRefresh}>🔄</button>

          <button
            onClick={handleDelete}
            disabled={!selectedIds.length}
            className="danger"
          >
            🗑️
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="table-container">
        {loading ? (
          <p>Loading data surat...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    checked={
                      filteredData.length > 0 &&
                      selectedIds.length === filteredData.length
                    }
                    onChange={toggleSelectAll}
                  />
                </th>
                <th>NOSU</th>
                <th>STATUS LPD</th>
                <th>TANGGAL BUAT</th>
                <th>LAMA</th>
                <th>TANGGAL KEGIATAN</th>
                <th>TANGGAL SELESAI</th>
                <th>KEPALA PUSKESMAS</th>
                <th>JUMLAH PETUGAS</th>
                <th>PETUGAS 1</th>
                <th>PETUGAS 2</th>
                <th>PETUGAS 3</th>
                <th>PETUGAS 4</th>
                <th>PETUGAS 5</th>
                <th>JENIS PERJADIN</th>
                <th>DALAM RANGKA</th>
                <th>ATAS NAMA</th>
                <th>TEMPAT</th>
              </tr>
            </thead>

            <tbody>
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan="9" style={{ textAlign: "center" }}>
                    Data tidak ditemukan
                  </td>
                </tr>
              ) : (
                filteredData.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(item.id)}
                        onChange={() => toggleSelect(item.id)}
                      />
                    </td>

                    <td
                      className="row-click"
                      onClick={() => navigate(`/data-surat/${item.id}`)}
                    >
                      {item.id}
                    </td>
                    <td>{item.status}</td>
                    <td>{item.tanggal_buat}</td>
                    <td>{item.lama}</td>
                    <td>{item.tanggal_mulai}</td>
                    <td>{item.tanggal_selesai}</td>
                    <td>{item.kepala}</td>
                    <td>{item.jumlah_petugas}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* FAB */}
      <button className="tambahSurat" onClick={() => navigate("/tambah-surat")}>
        +
      </button>
    </div>
  );
}

export default DataSurat;
