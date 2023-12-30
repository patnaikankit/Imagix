// to return the list the images we have previously generated
import { Dispatch, SetStateAction, useState, useEffect } from "react";
import { ImageModalState } from "../types/type";
import { Image } from "../types/type";
import imageService from "../services/image.service";
import { removeDuplicatedById } from "../utils";

interface ImageModalProps {
    setImageModalState: Dispatch<SetStateAction<ImageModalState>>;
}
  

const Explore = ({ setImageModalState }: ImageModalProps) => {
    // States
    // to store the previously generated images
    const [generatedImages, setGeneratedImages] = useState<Image[]>([]);
    // are the images being retrieved
    const [isFetching, setIsFetching] = useState(false);
    // to show the page number 
    const [page, setPage] = useState(1);
    // to check if the list has ended
    const [isEnded, setIsEnded] = useState(false);



    useEffect(() => {
        window.addEventListener("scroll", handleInfiniteScroll);
    
        return () => window.removeEventListener("scroll", handleInfiniteScroll);
    }, []);


    useEffect(() => {
        if(!isEnded && !isFetching){
          fetch();
        }
    }, [page]);
    


    // Functions
    // to handle infinite scrolling
    const handleInfiniteScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight){
          setPage((page) => page + 1);
        }
    };


    // to fetch all the images
    const fetch = async () => {
        try {
          setIsFetching(true);
          const response = await imageService.fetchImages(page);
          console.log(response);
          if(response.status === 201 || response.status === 200){
            const images: Image[] = response?.data?.data || [];
    
            setIsEnded(images.length === 0);
    
            setGeneratedImages((prevValue) =>
              removeDuplicatedById([...prevValue, ...images])
            );
          }
        } 
        catch(error){
          console.log("Error : ", error);
        } 
        finally{
          setIsFetching(false);
        }
    };



    return(
        <div className="container mx-auto max-w-screen-xl mt-16 px-3">
            <div className="mb-5">
                <h2 className="animate-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent text-3xl font-bold">
                    Explore
                </h2>

                <p className="mt-2 text-xs sm:text-sm">
                    Witness the captivating visual creations our application has been producing. Prepare to be amazed by the unique possibilities it offers.
                </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {generatedImages?.length > 0 &&
                    generatedImages?.map((image) => (
                    <div
                    key={image._id}
                    className="cursor-pointer hover:scale-105 transition-all duration-200"
                    onClick={(e) => {
                        e.stopPropagation();
                        setImageModalState((pre) => ({
                        ...pre,
                        open: true,
                        imgSrc: image.imageUrl,
                        prompt: image.prompt,
                        }));
                    }}
                    >
                    <img
                        key={image._id}
                        className="h-auto w-80 rounded-lg"
                        src={image.imageUrl}
                        alt={image.prompt}
                    />
                    </div>
                ))}
                {isFetching &&
                [1, 2, 3, 4, 5, 6, 7, 8].map((ele) => (
                    <div
                    key={ele}
                    className="h-48 lg:h-80 bg-gray-200 rounded-lg dark:bg-gray-700 animate-pulse"
                    ></div>
                ))}
            </div>
        </div>
    );
}


export default Explore;