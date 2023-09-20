import {I18nextProvider} from "react-i18next";
import i18n from "./config/translations";
import {Routes} from "./Routes";
import GlobalStyle from "./UI/GlobalStyles";

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <>
        <GlobalStyle />
        <Routes />
      </>
    </I18nextProvider>
  );
}

export default App;
