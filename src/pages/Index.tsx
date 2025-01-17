import YeastCalculator from "../components/YeastCalculator";
import Footer from "../components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-yeast-50 to-white flex flex-col">
      <div className="flex-grow py-12">
        <YeastCalculator />
      </div>
      <Footer />
    </div>
  );
};

export default Index;