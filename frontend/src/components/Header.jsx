function Header({ title, subtitle }) {
  return (
    <header style={styles.header}>
      <h1 style={styles.title}>{title}</h1>
      {subtitle && <p style={styles.subtitle}>{subtitle}</p>}
    </header>
  );
}

const styles = {
  header: {
    backgroundColor: "#1e293b",
    color: "#fff",
    padding: "16px 24px",
  },
  title: {
    fontSize: "24px",
    fontWeight: "600",
    margin: 0,
  },
  subtitle: {
    fontSize: "13px",
    opacity: 0.8,
    marginTop: "4px",
  },
};

export default Header;
