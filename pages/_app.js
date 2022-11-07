import "../styles/globals.css";
import Layout from "../components/Layout";
import config from "../config";

function MyApp({ Component, pageProps }) {
  return (
    <Layout config={config}>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
