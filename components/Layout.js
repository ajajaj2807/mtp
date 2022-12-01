import Header from "./Header";

const Layout = ({ config, children }) => {
  return (
    <div className="page_container">
      <Header config={config} />
      {children}
    </div>
  );
};

export default Layout;
