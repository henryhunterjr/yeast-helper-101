import React from 'react';
import { Button } from "@/components/ui/button";
import { ExternalLink } from 'lucide-react';

const AboutUsContent = () => {
  return (
    <div className="space-y-6 max-w-4xl mx-auto p-4">
      {/* Header Image */}
      <div className="flex justify-center mb-8">
        <img
          src="/lovable-uploads/a90f2fd8-a6fe-4cab-9665-4398eae5a21b.png"
          alt="Henry Hunter"
          className="rounded-lg w-48 h-48 object-cover shadow-lg"
        />
      </div>

      {/* Welcome Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-yeast-800">Welcome to Baking Great Bread at Home</h2>
        <p className="text-gray-700">
          A vibrant Facebook community where bread enthusiasts and home bakers worldwide come together to share their passion and expertise. Founded by artisan baker and author Henry Hunter, our mission is to make the art of bread-making accessible and enjoyable for everyone.
        </p>
      </section>

      {/* Community Section */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold text-yeast-700">Our Community</h3>
        <p className="text-gray-700">
          With tens of thousands of members globally, our Facebook group is a hub for sharing recipes, tips, and baking experiences. We believe in the simplicity of ingredients and cherish the natural magic of flour, water, salt, and yeast. Whether you're a beginner or a seasoned baker, you'll find a supportive environment to enhance your skills.
        </p>
        <Button variant="outline" className="mt-2" onClick={() => window.open("https://www.facebook.com/groups/bakinggreatbread", "_blank")}>
          Join our Facebook Group <ExternalLink className="ml-2 h-4 w-4" />
        </Button>
      </section>

      {/* About Henry Section */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold text-yeast-700">About Henry Hunter</h3>
        <p className="text-gray-700">
          Henry's journey into baking began during his distinguished career in the United States Army, where he was inspired by an unexpected baker named Mr. Sherman, his landlord. This experience stayed with him and years later, after 26 years as an advertising and marketing account executive, he rediscovered his passion for bread baking. As the founder of Baking Great Bread at Home, Henry is dedicated to sharing his knowledge and fostering a community of bread enthusiasts.
        </p>
      </section>

      {/* Commitment Section */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold text-yeast-700">Our Commitment</h3>
        <p className="text-gray-700">
          We are continually striving to improve the baking experience by providing resources, hosting engaging challenges, and developing tools to assist home bakers. Our latest endeavor is the Yeast Converter App, designed to simplify yeast conversions and help you perfect your recipes.
        </p>
      </section>

      {/* Join Us Section */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold text-yeast-700">Join Us</h3>
        <p className="text-gray-700">
          Embark on your baking journey with us and transform your kitchen into a bakery. Feel at home, ask questions, and share your experiences. Together, we'll explore the art and science of bread-making.
        </p>
        <div className="space-y-2">
          <p className="font-medium text-yeast-800">Happy baking!</p>
          <p className="font-medium text-yeast-800">Henry Hunter</p>
          <p className="text-gray-600">Group Administrator</p>
        </div>
      </section>

      {/* Footer Links */}
      <footer className="pt-6 border-t border-gray-200">
        <div className="space-y-2">
          <p className="font-medium">Baking Great Bread at Home</p>
          <Button variant="link" className="p-0 h-auto" onClick={() => window.open("http://bakinggreatbread.blog", "_blank")}>
            Visit our blog <ExternalLink className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </footer>
    </div>
  );
};

export default AboutUsContent;