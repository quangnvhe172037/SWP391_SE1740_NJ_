import './App.css';
import { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { publicRoutes } from "./routes";
import DefaultLayout from "./pages/customer/Layout/DefaultLayout";
function App() {
  return (
      <Router>
          <div className="App">
              <Routes>
                  {publicRoutes.map((router, index) => {
                      const Layout = router.layout === null ? Fragment : DefaultLayout;
                      const Page = router.component;
                      return (
                          <Route
                              key={index}
                              path={router.path}
                              element={
                                  <Layout>
                                      <Page />
                                  </Layout>
                              }
                          />
                      );
                  })}
              </Routes>
          </div>
      </Router>
  );
}

export default App;
