import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header style={styles.header}>
      <div style={styles.container}>
        <h2 style={styles.logo}>TaskPus</h2>

        <nav style={styles.nav}>
          <Link to="/data-surat">Data Surat Tugas</Link>
          <Link to="/cetak-surat">Cetak Surat</Link>
          <Link to="/menu-data">Menu Data</Link>
          <Link to="/lpd">LPD</Link>
        </nav>
      </div>
    </header>
  );
}

const styles = {
  header: {
    width: "100%",
    backgroundColor: "#0f172a",
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "16px 24px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: "#fff",
  },
  logo: {
    margin: 0,
  },
  nav: {
    display: "flex",
    gap: "20px",
  },
};

export default Navbar;
