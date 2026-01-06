import Header from "../components/Header";
import DashboardCard from "../components/DashboardCard";

function Dashboard() {
  return (
    <>
      <Header title="Dashboard TASKPUS" />

      <div style={styles.container}>
        <DashboardCard
          title="Data Surat Tugas"
          desc="Kelola perjalanan dinas & surat tugas"
          to="/data-surat"
          icon="📄"
        />

        <DashboardCard
          title="Cetak Surat"
          desc="Generate surat tugas ke PDF"
          to="/cetak-surat"
          icon="🖨️"
        />

        <DashboardCard
          title="Menu Data"
          desc="Master data pendukung sistem"
          to="/menu-data"
          icon="📊"
        />

        <DashboardCard
          title="LPD"
          desc="Laporan perjalanan dinas (publik)"
          to="/lpd"
          icon="📘"
        />
      </div>
    </>
  );
}

const styles = {
  container: {
    padding: "24px",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "24px",
  },
};

export default Dashboard;
