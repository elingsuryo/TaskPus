import Navbar from "./Navbar";

function Layout({ children }) {
  return (
    <div>
      <Navbar />
      <main style={styles.main}>{children}</main>
    </div>
  );
}

const styles = {
  main: {
    padding: "24px",
  },
};

export default Layout;
