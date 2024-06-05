import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import { AppWrapper } from "./styles";

function App() {
  return (
    <>
      <AppWrapper>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="" element={<div>Main</div>} />
          </Route>
        </Routes>
      </AppWrapper>
    </>
  );
}

export default App;
