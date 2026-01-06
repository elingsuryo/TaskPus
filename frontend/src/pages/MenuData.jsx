import Header from "../components/Header";
import DashboardCard from "../components/DashboardCard";

function MenuData() {
  return (
    <>
      <Header title="Menu Data" />

      <div style={styles.container}>
        <DashboardCard title="DATA ASN" to="/data-asn" icon="📄" />

        <DashboardCard
          title="DATA PETUGAS LAIN"
          to="/data-petugas-lain"
          icon="🖨️"
        />

        <DashboardCard title="DATA KAPUS" to="/data-kapus" icon="📊" />

        <DashboardCard title="GOLONGAN" to="/golongan" icon="📘" />
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

export default MenuData;
