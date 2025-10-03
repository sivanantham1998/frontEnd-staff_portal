import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./Authentication/Login";
import Server from "./ApiContext/Server";
import { ProtectedRoute } from "./ProtectedRoute";
import Dashboard from "./Dashboard/Dashboard";
import Lead from "./pages/Lead";
import Layout from "./layout/Layout";
import Branches from "./pages/Branches";
import CreateBranch from "./pages/CreateBranch";
import BranchInfo from "./pages/BranchInfo";
import AdminCreation from "./pages/AdminCreation";
import Todo_list from "./pages/Todo_list";

function App() {
  return (
    <>
      <Server>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />

          <Route element={<ProtectedRoute />}>
            <Route element={<Layout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/leadForm" element={<Lead />} />
              <Route path="/branches" element={<Branches />} />
              <Route path="/createbranch" element={<CreateBranch />} />
              <Route path="branches/:name" element={<BranchInfo />} />
              <Route path="/branches/:name/admin" element={<AdminCreation />} />
              <Route path="/todolist" element={<Todo_list />} />
              <Route index element={<Navigate to="/dashboard" replace />} />
            </Route>
          </Route>
        </Routes>
      </Server>
    </>
  );
}

export default App;
