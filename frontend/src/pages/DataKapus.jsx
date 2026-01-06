import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../service/api";
import "./DataKapus.css";

function DataKapus() {
  const navigate = useNavigate();

  const [dataKapus, setDataKapus] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedNip, setSelectedNip] = useState([]);
  const [loading, setLoading] = useState(false);

  /* 🔄 FETCH DATA KAPUS */
  const fetchKapus = async () => {
    try {
      setLoading(true);
      const res = await api.get("/kapus");
      setDataKapus(res.data);
    } catch (err) {
      console.error("Gagal ambil data Kapus:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchKapus();
  }, []);

  /* 🔍 SEARCH */
  const filteredData = dataKapus.filter(
    (item) =>
      item.nama_kepala.toLowerCase().includes(search.toLowerCase()) ||
      item.nip.includes(search)
  );

  /* ☑️ CHECKBOX */
  const toggleSelect = (nip) => {
    setSelectedNip((prev) =>
      prev.includes(nip) ? prev.filter((n) => n !== nip) : [...prev, nip]
    );
  };

  const toggleSelectAll = () => {
    if (selectedNip.length === filteredData.length) {
      setSelectedNip([]);
    } else {
      setSelectedNip(filteredData.map((item) => item.nip));
    }
  };

  /* 🗑️ DELETE */
  const handleDelete = async () => {
    if (!selectedNip.length) return;
    if (!window.confirm("Yakin hapus data Kapus terpilih?")) return;

    try {
      await Promise.all(selectedNip.map((nip) => api.delete(`/kapus/${nip}`)));
      setSelectedNip([]);
      fetchKapus();
    } catch (err) {
      console.error("Gagal hapus Kapus:", err);
    }
  };

  /* 🔄 REFRESH */
  const handleRefresh = () => {
    setSearch("");
    setSelectedNip([]);
    fetchKapus();
  };

  return (
    <div className="datakapus-wrapper">
      {/* HEADER */}
      <div className="datakapus-header">
        <h2>DATA KEPALA PUSKESMAS</h2>

        <div className="header-actions">
          <input
            type="text"
            placeholder="Cari Nama / NIP..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button onClick={handleRefresh}>🔄</button>

          <button
            onClick={handleDelete}
            disabled={!selectedNip.length}
            className="danger"
          >
            🗑️
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="table-container">
        {loading ? (
          <p>Loading data Kapus...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    checked={
                      filteredData.length > 0 &&
                      selectedNip.length === filteredData.length
                    }
                    onChange={toggleSelectAll}
                  />
                </th>
                <th>Nama Kepala</th>
                <th>NIP</th>
                <th>Golongan</th>
                <th>Jabatan</th>
                <th>Keterangan</th>
              </tr>
            </thead>

            <tbody>
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center" }}>
                    Data tidak ditemukan
                  </td>
                </tr>
              ) : (
                filteredData.map((item) => (
                  <tr key={item.nip}>
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedNip.includes(item.nip)}
                        onChange={() => toggleSelect(item.nip)}
                      />
                    </td>

                    <td
                      className="row-click"
                      onClick={() => navigate(`/data-kapus/${item.nip}`)}
                    >
                      {item.nama_kepala}
                    </td>
                    <td>{item.nip}</td>
                    <td>{item.pangkat}</td>
                    <td>{item.jabatan}</td>
                    <td>{item.keterangan}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* FAB */}
      <button className="tambahKapus" onClick={() => navigate("/tambah-kapus")}>
        +
      </button>
    </div>
  );
}

export default DataKapus;
