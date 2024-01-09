import Router from "./router/Router";
import { RecoilRoot } from "recoil";
import GlobalStyles from "./styles/GlobalStyles";

function App() {
  return (
    <RecoilRoot>
      <GlobalStyles />
      <Router />
    </RecoilRoot>
  );
}

export default App;
