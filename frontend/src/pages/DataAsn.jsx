import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../service/api";
import "./DataAsn.css";

function DataAsn() {
  const navigate = useNavigate();

  const [dataAsn, setDataAsn] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedNip, setSelectedNip] = useState([]);
  const [loading, setLoading] = useState(false);

  /* 🔄 FETCH DATA ASN */
  const fetchAsn = async () => {
    try {
      setLoading(true);
      const res = await api.get("/asn");
      setDataAsn(res.data);
    } catch (err) {
      console.error("Gagal ambil data ASN:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAsn();
  }, []);

  /* 🔍 SEARCH */
  const filteredData = dataAsn.filter(
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
    if (!window.confirm("Yakin hapus data ASN terpilih?")) return;

    try {
      await Promise.all(selectedNip.map((nip) => api.delete(`/asn/${nip}`)));
      setSelectedNip([]);
      fetchAsn();
    } catch (err) {
      console.error("Gagal hapus ASN:", err);
    }
  };

  /* 🔄 REFRESH */
  const handleRefresh = () => {
    setSearch("");
    setSelectedNip([]);
    fetchAsn();
  };

  return (
    <div className="dataasn-wrapper">
      {/* HEADER */}
      <div className="dataasn-header">
        <h2>DATA ASN</h2>

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
        {loading ? (
          <p>Loading data ASN...</p>
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
                <th>Nama Staf</th>
                <th>NIP</th>
                <th>Pangkat</th>
                <th>Jabatan</th>
                <th>Unit Kerja</th>
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
                      onClick={() => navigate(`/data-asn/${item.nip}`)}
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
        )}
      </div>

      {/* FAB */}
      <button className="tambahAsn" onClick={() => navigate("/tambah-asn")}>
        +
      </button>
    </div>
  );
}

export default DataAsn;
