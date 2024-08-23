import { BrowserRouter, Route, Routes } from "react-router-dom";
import NoteProvider from "./context/NoteContext";
import NotePage from "./pages/NotePage";
import HomePage from "./pages/HomePage";
import ProtectedRoutes from "./components/ProtectedRoutes";

function App() {
  return (
    <div id="app">
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route element={<ProtectedRoutes />} >
            <Route
              path="/"
              element={
                <NoteProvider>
                  <NotePage />
                </NoteProvider>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
