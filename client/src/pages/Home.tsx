import Header from "../components/Header";

const Home = () => {
  return (
    <div>
        <Header />
        <div className="container mx-auto max-w-screen-xl px-2">
            <h1 className="mt-16 pb-7 sm:mt-20 animate-text text-center bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent text-5xl sm:7xl font-black">
            Text to Image with OpenAI
            </h1>

            <p className="text-center">
                Unleash your creativity using our platform and experience the
                awe-inspiring capabilities of computer-generated imagery!
            </p>

            <div className="max-w-screen-xl mt-10 mx-auto">
                <div className="mb-6 flex space-y-5 flex-col sm:flex-row sm:items-baseline sm:space-x-5">
                    <div className="flex w-full row space-x-2 items-center">
                        <input
                            type="text"
                            value="Prompt"
                            placeholder="Describe what you want the AI to draw"
                            onChange={() => {}}
                            className="block w-full p-4 text-gray-700 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-purple-500"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Home;