import Footer from "@/components/Layout/Footer";
import Navbar from "@/components/Layout/Navbar";


const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar></Navbar>
      <main>{children}</main>
    <Footer></Footer>
    </>
  );
};

export default MainLayout;