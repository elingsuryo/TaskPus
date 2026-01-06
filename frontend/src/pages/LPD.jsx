import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../service/api";
import "./LPD.css";

function Lpd() {
  const navigate = useNavigate();

  // ===============================
  // STATE
  // ===============================
  const [dataLpd, setDataLpd] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);
  const [loading, setLoading] = useState(false);

  // ===============================
  // FETCH DATA
  // ===============================
  const fetchLpd = async () => {
    try {
      setLoading(true);
      const res = await api.get("/lpd");
      setDataLpd(res.data.data ?? res.data);
    } catch (err) {
      console.error("Gagal ambil data LPD", err);
      alert("Gagal memuat data LPD");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLpd();
  }, []);

  // ===============================
  // SEARCH
  // ===============================
  const filteredData = dataLpd.filter((item) =>
    item.id.toString().includes(search)
  );

  // ===============================
  // CHECKBOX
  // ===============================
  const toggleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(filteredData.map((item) => item.id));
    } else {
      setSelectedIds([]);
    }
  };

  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  // ===============================
  // DELETE
  // ===============================
  const handleDelete = async () => {
    if (!selectedIds.length) return alert("Pilih data yang ingin dihapus");
    if (!window.confirm("Yakin ingin menghapus data terpilih?")) return;

    try {
      await Promise.all(selectedIds.map((id) => api.delete(`/lpd/${id}`)));
      setSelectedIds([]);
      fetchLpd();
    } catch (err) {
      console.error("Gagal hapus LPD", err);
      alert("Gagal menghapus data");
    }
  };

  // ===============================
  // REFRESH
  // ===============================
  const handleRefresh = () => {
    setSearch("");
    setSelectedIds([]);
    fetchLpd();
  };

  // ===============================
  // RENDER
  // ===============================
  return (
    <div className="lpd-wrapper">
      {/* HEADER */}
      <div className="lpd-header">
        <h2>DATA LPD</h2>

        <div className="header-actions">
          <input
            type="text"
            placeholder="Cari NOSU..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button className="btn-refresh" onClick={handleRefresh}>
            🔄
          </button>

          <button
            className="btn-delete"
            onClick={handleDelete}
            disabled={!selectedIds.length}
          >
            🗑️
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th className="col-checkbox">
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
              <th>Status</th>
              <th>Tgl Buat</th>
              <th>Lama</th>
              <th>Tgl Mulai</th>
              <th>Tgl Selesai</th>
              <th>Kepala</th>
              <th>Jml Petugas</th>
              <th>Petugas 1</th>
              <th>Petugas 2</th>
              <th>Jenis</th>
              <th>Rangka</th>
              <th>Atas Nama</th>
              <th>Tempat</th>
              <th>Hasil</th>
              <th>Pelaksana</th>
              <th>User</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="18" className="empty">
                  Loading...
                </td>
              </tr>
            ) : filteredData.length === 0 ? (
              <tr>
                <td colSpan="18" className="empty">
                  Data tidak ditemukan
                </td>
              </tr>
            ) : (
              filteredData.map((item) => (
                <tr key={item.id}>
                  <td className="col-checkbox">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(item.id)}
                      onChange={() => toggleSelect(item.id)}
                    />
                  </td>

                  <td
                    className="row-click"
                    onClick={() => navigate(`/lpd/${item.id}`)}
                  >
                    {item.id}
                  </td>
                  <td className="status-sudah">({item.status})</td>
                  <td>{item.tgl_buat}</td>
                  <td>{item.lama}</td>
                  <td>{item.tgl_mulai}</td>
                  <td>{item.tgl_selesai}</td>
                  <td>{item.kepala}</td>
                  <td>{item.jumlah_petugas}</td>
                  <td>{item.petugas1}</td>
                  <td>{item.petugas2}</td>
                  <td>{item.jenis_perjadin}</td>
                  <td>{item.dalam_rangka}</td>
                  <td>{item.atas_nama}</td>
                  <td>{item.tempat}</td>
                  <td>{item.hasil_kegiatan}</td>
                  <td>{item.petugas_pelaksana}</td>
                  <td>{item.user}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Lpd;
