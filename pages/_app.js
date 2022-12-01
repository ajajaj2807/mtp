import "../styles/globals.css";
import Layout from "../components/Layout";
import config from "../config";
import { Provider as StyletronProvider } from "styletron-react";
import { LightTheme, BaseProvider } from "baseui";
import { styletron } from "../styletron";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

function MyApp({ Component, pageProps }) {
  return (
    <StyletronProvider value={styletron}>
      <BaseProvider theme={LightTheme}>
        <Layout config={config}>
          <Component {...pageProps} />
        </Layout>
      </BaseProvider>
    </StyletronProvider>
  );
}

export default MyApp;
