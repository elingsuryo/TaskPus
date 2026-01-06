import { BrowserRouter, Routes, Route } from "react-router-dom";

/* Pages */
import Dashboard from "./pages/Dashboard";
import DataSurat from "./pages/DataSurat";
import DetailSurat from "./pages/DetailSurat";
import TambahSurat from "./pages/TambahSurat";
import CetakSurat from "./pages/CetakSurat";
import MenuData from "./pages/MenuData";
import DataAsn from "./pages/DataAsn";
import DataKapus from "./pages/DataKapus";
import Golongan from "./pages/Golongan";
import DataPetugasLain from "./pages/DataPetugasLain";
import Login from "./pages/Login";
import TambahKapus from "./pages/TambahKapus";
import TambahPetugasLain from "./pages/TambahPetugasLain";
import TambahAsn from "./pages/TambahAsn";
import TambahGolongan from "./pages/TambahGolongan";
import LPD from "./pages/LPD";
import DetailLpd from "./pages/DetailLpd";
import FormLpd from "./pages/FormLpd";
/* Guard */
import AuthGuard from "./components/AuthGuard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ================== TANPA LOGIN ================== */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/lpd" element={<LPD />} />
        <Route path="/lpd/:id" element={<DetailLpd />} />
        <Route path="/form-lpd" element={<FormLpd />} />
        <Route path="/form-lpd/:id" element={<FormLpd />} />

        {/* ================== WAJIB LOGIN ================== */}
        <Route
          path="/menu-data"
          element={
            <AuthGuard>
              <MenuData />
            </AuthGuard>
          }
        >
          {/* ===== CHILD MENU DATA (AUTO LOGIN) ===== */}
          <Route path="data-asn" element={<DataAsn />} />
          <Route path="tambah-asn" element={<TambahAsn />} />

          <Route path="data-kapus" element={<DataKapus />} />
          <Route path="tambah-kapus" element={<TambahKapus />} />

          <Route path="data-petugas-lain" element={<DataPetugasLain />} />
          <Route path="tambah-petugas-lain" element={<TambahPetugasLain />} />

          <Route path="golongan" element={<Golongan />} />
          <Route path="tambah-golongan" element={<TambahGolongan />} />

          {/* ===== CHILD MENU DATA SURAT ===== */}
          <Route path="data-surat" element={<DataSurat />} />
          <Route path="data-surat/:id" element={<DetailSurat />} />
          <Route path="tambah-surat" element={<TambahSurat />} />
          <Route path="tambah-surat/:id" element={<TambahSurat />} />
        </Route>

        {/* ================== WAJIB LOGIN (LAINNYA) ================== */}
        <Route
          path="/data-surat"
          element={
            <AuthGuard>
              <DataSurat />
            </AuthGuard>
          }
        />

        <Route
          path="/cetak-surat"
          element={
            <AuthGuard>
              <CetakSurat />
            </AuthGuard>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
