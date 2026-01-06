import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../service/api";
import "./Golongan.css";

function Golongan() {
  const navigate = useNavigate();

  const [dataGolongan, setDataGolongan] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState([]);
  const [loading, setLoading] = useState(false);

  /* 📡 FETCH DATA */
  const fetchGolongan = async () => {
    try {
      setLoading(true);
      const res = await api.get("/golongan");
      setDataGolongan(res.data.data ?? res.data);
    } catch (err) {
      console.error("Gagal ambil data golongan", err);
      alert("Gagal memuat data golongan");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGolongan();
  }, []);

  /* 🔍 SEARCH */
  const filteredData = dataGolongan.filter((item) =>
    item.nama.toLowerCase().includes(search.toLowerCase())
  );

  /* ☑️ CHECKBOX */
  const toggleSelect = (id) => {
    setSelectedId((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedId.length === filteredData.length) {
      setSelectedId([]);
    } else {
      setSelectedId(filteredData.map((item) => item.id));
    }
  };

  /* 🗑️ DELETE */
  const handleDelete = async () => {
    if (!selectedId.length) return;
    if (!window.confirm("Yakin hapus golongan terpilih?")) return;

    try {
      await Promise.all(selectedId.map((id) => api.delete(`/golongan/${id}`)));
      fetchGolongan();
      setSelectedId([]);
    } catch (err) {
      console.error("Gagal hapus golongan", err);
      alert("Gagal menghapus golongan");
    }
  };

  /* 🔄 REFRESH */
  const handleRefresh = () => {
    setSearch("");
    setSelectedId([]);
    fetchGolongan();
  };

  return (
    <div className="golongan-wrapper">
      {/* HEADER */}
      <div className="golongan-header">
        <h2>GOLONGAN</h2>

        <div className="header-actions">
          <input
            type="text"
            placeholder="Cari Golongan..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button onClick={handleRefresh}>🔄</button>

          <button
            className="danger"
            onClick={handleDelete}
            disabled={!selectedId.length}
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
                    selectedId.length === filteredData.length
                  }
                  onChange={toggleSelectAll}
                />
              </th>
              <th>Golongan</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="2" style={{ textAlign: "center" }}>
                  Loading...
                </td>
              </tr>
            ) : filteredData.length === 0 ? (
              <tr>
                <td colSpan="2" style={{ textAlign: "center" }}>
                  Data tidak ditemukan
                </td>
              </tr>
            ) : (
              filteredData.map((item) => (
                <tr key={item.id}>
                  <td className="col-checkbox">
                    <input
                      type="checkbox"
                      checked={selectedId.includes(item.id)}
                      onChange={() => toggleSelect(item.id)}
                    />
                  </td>
                  <td
                    className="row-click"
                    onClick={() => navigate(`/golongan/${item.id}`)}
                  >
                    {item.nama}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* FAB */}
      <button
        className="tambahGolongan"
        onClick={() => navigate("/tambah-golongan")}
      >
        +
      </button>
    </div>
  );
}

export default Golongan;
