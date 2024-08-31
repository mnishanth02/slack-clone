import Footer from "../../components/common/footer";
import { Header } from "../../components/common/header";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col">
      {/* <Header /> */}
      <main className="h-cover">{children}</main>
      {/* <Footer /> */}
    </div>
  );
};

export default MainLayout;
