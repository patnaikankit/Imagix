import { useState } from "react";
import Header from "../components/Header";
import SizeSelector from "../components/SizeSelector";
import { Image_Size } from "../ImageSize/ImageSize";
import { ImageModalState } from "../types/type";
import imageService from "../services/image.service";
import classNames from "classnames";
import { getSurprisePrompt } from "../utils";
import Explore from "../components/Explore";
import GeneratedImageModal from "../components/GeneratedImageModal";


const Home = () => {
    // State Change 
    // to let the select the size of the image
    const [sizeValue, setSizeValue] = useState(Image_Size[0].value);
    // to disable the generate the button once it is clicked until the image is generated 
    const [buttonDisable, setButtonDisable] = useState(false);
    // to store the data entered by the user for image generation
    const [imageModal, setImageModal] = useState<ImageModalState>({
        imgSrc: null,
        open: false,
        prompt: "",
    });
    // to keep track of the prompt the user has entered
    const [prompt, setPrompt] = useState("");
    // to handle any error while generating an image 
    const [errorModal, setErrorModal] = useState(false);


    // ------------------------------------------------------------------------------------------
    // Functions

    // function to handle the result of image generation service
    const generateImage = async () => {
        try {
            setButtonDisable(true);
            const response = await imageService.generateImage({
              prompt,
              size: sizeValue,
            });
      
            setButtonDisable(false);
      
            if (response.status === 201 || response.status === 200) {
              const imageUrl = response?.data?.data?.imageUrl;
      
              setImageModal((prev) => ({
                ...prev,
                imgSrc: imageUrl,
                open: true,
                prompt: prompt,
              }));
            } 
            else{
              setErrorModal(true);
            }
          } 
          catch(error){
            setErrorModal(true);
          }
    }



  return (
    <div>
        <Header />
        <div className="container mx-auto max-w-screen-xl px-2">
            <h1 className="mt-16 pb-7 sm:mt-20 animate-text text-center bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent text-5xl sm:7xl font-black">
            Text to Image with OpenAI
            </h1>

            <p className="text-center">
                Tap into your creative genius with our platform and be amazed by the sheer magic of computer-generated imagery! Transform your ideas into reality, whether it's an otherworldly adventure or a visual feast of colors and shapes.
            </p>

            <div className="max-w-screen-xl mt-10 mx-auto">
                <div className="mb-6 flex space-y-5 flex-col sm:flex-row sm:items-baseline sm:space-x-5">
                    <div className="flex w-full row space-x-2 items-center">
                        <input
                            type="text"
                            value={prompt}
                            placeholder="Describe what you want the AI to draw"
                            onChange={(e) => setPrompt(e.target.value)}
                            className="block w-full p-4 text-gray-700 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-purple-500"
                        />

                        <SizeSelector
                            value={sizeValue}
                            onValueChange={(value) => {
                                setSizeValue(value);
                            }}
                        />
                    </div>

                    <button
                        type="button"
                        onClick={generateImage}
                        className={classNames(
                            "text-white btn capitalize border-none bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-2 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center",
                            { "btn-disabled": prompt === "" },
                            { loading: buttonDisable }
                        )}
                        >
                        {buttonDisable ? "Generating..." : "Generate"}
                    </button>
                </div>

                <div className="pl-1">
                    <h2 className="inline-block mr-2 font-bold text-sm sm:text-base">
                    No Inspiration ? Try &rArr;
                    </h2>
                    <button
                    className="btn btn-xs sm:btn-sm btn-outline capitalize"
                    onClick={() => {
                        setPrompt(getSurprisePrompt(prompt));
                    }}
                    >
                        Surprise Me
                    </button>
                </div>
            </div>
        </div>

        <Explore setImageModalState={setImageModal} />

        <div className="mb-16"></div>

        <GeneratedImageModal
            dialogState={imageModal}
            setDialogState={setImageModal}
      />
    </div>
  )
}

export default Home;