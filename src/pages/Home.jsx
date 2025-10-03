import Layout from "../layout/Layout";
import Cookies from "js-cookie";
export default function Home() {
  const token = Cookies.get("token");
  console.log(token);
  return (
    <div>
      <Layout />
    </div>
  );
}
