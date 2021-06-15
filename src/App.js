import "./App.css";
import { BrowserRouter } from "react-router-dom";
import RouterConfig from "navigation/RouterConfig";
import { ThemeProvider } from "@material-ui/styles";
import theme from "styles/theme";

function App() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <div className="header"></div>
          <div className="content">
            <RouterConfig />
          </div>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
