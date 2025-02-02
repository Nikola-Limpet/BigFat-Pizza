const WhyChooseUs = () => {
  return (
    <div className="why-choose-us py-10  bg-[#FFF5E6] relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[url('/placeHolder.bmp')] bg-repeat"></div>
      <div className="container mx-auto px-4 relative z-10">
        {/* Header Section */}
        <div className="flex flex-col items-center mb-16">
          <div className="mb-8">
            <img
              src="/logo.jpg"
              alt="Authentic Pizza"
              className="h-32 w-32 object-contain"
            />
          </div>
          <h2 className="text-5xl md:text-5xl ml-9 font-bold text-[#C41E3A] mb-4 font-pacifico text-center">
            Why Big Fat Pizza?
          </h2>
          <p className="text-xl text-[#6B4226] max-w-2xl text-center mb-8">
            We're not just making pizza - we're crafting experiences that taste like Italy!
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7 m-1">
          {[
            {
              title: "Wood-Fired Perfection",
              content: "Traditional brick oven baking at 900°F for that authentic charred crust",
              icon: "🔥",
              color: "bg-[#C41E3A]/10"
            },
            {
              title: "Farm Fresh Ingredients",
              content: "Locally sourced vegetables & premium imported Italian cheeses",
              icon: "🍅",
              color: "bg-[#FFA726]/70"
            },
            {
              title: "Secret Family Recipes",
              content: "Generations-old dough recipe fermented for 48 hours",
              icon: "👨🍳",
              color: "bg-[#33670A]/70"
            },
            {
              title: "Lightning Fast Delivery",
              content: "Hot & fresh at your door in 30 minutes or your next pizza's free",
              icon: "⚡",
              color: "bg-[#C41E3A]/70"
            },
            {
              title: "Custom Creations",
              content: "Build your own pizza with 40+ fresh toppings & sauces",
              icon: "🎨",
              color: "bg-[#FFA726]/70"
            },
            {
              title: "Eco-Friendly Packaging",
              content: "100% compostable boxes made from recycled materials",
              icon: "🌱",
              color: "bg-[#33670A]/70"
            }
          ].map((benefit, index) => (
            <div
              key={index}
              className={`p-8 rounded-2xl ${benefit.color} transition-all duration-300 hover:translate-y-[-5px] shadow-md hover:shadow-lg`}
            >
              <div className="text-4xl mb-4">{benefit.icon}</div>
              <h3 className="text-2xl font-bold text-[#2C1810] mb-3">
                {benefit.title}
              </h3>
              <p className="text-[#6B4226] text-xl font-medium leading-relaxed">
                {benefit.content}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center bg-[#C41E3A]/40 p-8 rounded-2xl border-2 border-[#C41E3A]/20">
          <p className="text-2xl italic text-[#6B4226]">
            "Every pizza is a masterpiece - crafted with love, served with pride,
            and guaranteed to make you come back for more!"
          </p>
          <p className="mt-4 font-bold text-[#C41E3A]">
            - The Big Fat Pizza Team
          </p>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;