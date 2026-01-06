import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../service/api";
import "./DataPetugasLain.css";

function DataPetugasLain() {
  const navigate = useNavigate();

  const [dataPetugasLain, setDataPetugasLain] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedNip, setSelectedNip] = useState([]);
  const [loading, setLoading] = useState(false);

  /* 📡 FETCH DATA */
  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await api.get("/petugas-lain");
      setDataPetugasLain(res.data.data ?? res.data);
    } catch (err) {
      console.error("Gagal ambil data petugas lain", err);
      alert("Gagal mengambil data petugas");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  /* 🔍 SEARCH */
  const filteredData = dataPetugasLain.filter(
    (item) =>
      item.nama_staf.toLowerCase().includes(search.toLowerCase()) ||
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
    if (!window.confirm("Yakin hapus data petugas terpilih?")) return;

    try {
      await api.post("/petugas-lain/bulk-delete", {
        nip: selectedNip,
      });

      fetchData();
      setSelectedNip([]);
    } catch (err) {
      console.error("Gagal hapus data", err);
      alert("Gagal menghapus data");
    }
  };

  /* 🔄 REFRESH */
  const handleRefresh = () => {
    setSearch("");
    setSelectedNip([]);
    fetchData();
  };

  return (
    <div className="datapetugaslain-wrapper">
      {/* HEADER */}
      <div className="datapetugaslain-header">
        <h2>DATA PETUGAS LAIN</h2>

        <div className="header-actions">
          <input
            type="text"
            placeholder="Cari Nama / NIP..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button onClick={handleRefresh}>🔄</button>

          <button
            className="danger"
            onClick={handleDelete}
            disabled={!selectedNip.length}
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
              <th>Nama Staf</th>
              <th>NIP</th>
              <th>Pangkat</th>
              <th>Jabatan</th>
              <th>Unit Kerja</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>
                  Loading...
                </td>
              </tr>
            ) : filteredData.length === 0 ? (
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
                    onClick={() => navigate(`/data-petugas-lain/${item.nip}`)}
                  >
                    {item.nama_staf}
                  </td>
                  <td>{item.nip}</td>
                  <td>{item.pangkat}</td>
                  <td>{item.jabatan}</td>
                  <td>{item.unit_kerja}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* FAB */}
      <button
        className="tambahDataPetugasLain"
        onClick={() => navigate("/tambah-petugas-lain")}
      >
        +
      </button>
    </div>
  );
}

export default DataPetugasLain;
