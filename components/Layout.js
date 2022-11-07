import Header from "./Header";

const Layout = ({ config, children }) => {
  return (
    <>
      <Header config={config} />
      {children}
    </>
  );
};

export default Layout;
