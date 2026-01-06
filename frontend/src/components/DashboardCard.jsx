import { Link } from "react-router-dom";

function DashboardCard({ title, desc, to, icon }) {
  return (
    <Link to={to} style={styles.card}>
      <div style={styles.icon}>{icon}</div>
      <h3>{title}</h3>
      <p>{desc}</p>
    </Link>
  );
}

const styles = {
  card: {
    background: "#fff",
    borderRadius: "12px",
    padding: "24px",
    textDecoration: "none",
    color: "#111",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    transition: "0.2s",
  },
  icon: {
    fontSize: "28px",
    marginBottom: "12px",
  },
};

export default DashboardCard;
