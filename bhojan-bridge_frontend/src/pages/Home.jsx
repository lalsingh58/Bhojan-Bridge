const Home = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-100 to-green-200 pt-20">
      <div className="text-center p-8 rounded-xl bg-white shadow-2xl animate-fade-up max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-bold text-green-700 mb-4 animate-bounce">
          Welcome to Bhojan Bridge 🌉
        </h1>
        <p className="text-lg md:text-xl text-gray-600">
          Connecting food vendors to smarter solutions. Share surplus, track
          insights, and grow together.
        </p>
        <button className="mt-6 bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition duration-300 shadow-lg animate-wiggle">
          Explore Features
        </button>
      </div>
    </div>
  );
};

export default Home;
