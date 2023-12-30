// to allow the user to copy and download the generated image
import { Dispatch, SetStateAction } from "react";
import { ImageModalState } from "../types/type";
import { useState, useRef } from "react";
import classNames from "classnames";
import { copyImageToClipboard } from "copy-image-clipboard";
import FileSaver from "file-saver";


interface ImageModalProps {
    dialogState: ImageModalState;
    setDialogState: Dispatch<SetStateAction<ImageModalState>>;
}


const GeneratedImageModal = ({ dialogState, setDialogState }: ImageModalProps) => {
    // to check whether the user has clicked on the copy and download button
    const [isCopied, setIsCopied] = useState(false);
    const [isDownloaded, setIsDownloaded] = useState(false);
    const { imgSrc, open, prompt } = dialogState;

    const modalRef = useRef<HTMLDivElement>(null);


    const handleClose = () => {
        setDialogState({ ...dialogState, open: false });
        clearModalContent();
    };

    const clearModalContent = () => {
        setTimeout(() => {
          setDialogState({
            ...dialogState,
            open: false,
            imgSrc: "",
            prompt: "",
          });
        }, 500);
    };


    const handleCopyImage = async (url: string | null) => {
        if(!url){
            return;
        } 
    
        try {
          await copyImageToClipboard(url);
          setIsCopied(true);
        } 
        catch(error){
          alert("something went wrong");
        }
      };
    
      const handleDownload = (url: string | null) => {
        if(url){
          FileSaver.saveAs(url, `download_${new Date().toLocaleDateString()}.png`);
        }
        setIsDownloaded(true);
      };


    return(
        <>
            <div
                className={classNames("modal", "backdrop-blur-sm", {
                "modal-open": open,
            })}
            >
                <div className="modal-box relative" ref={modalRef}>
                <label
                    className="absolute btn-ghost btn-circle btn btn-sm text-lg btn-primary right-3 top-3 hover:scale-105 transition-all duration-150"
                    onClick={handleClose}
                >
                    X
                </label>
                <div className="overflow-y-auto">
                    <div className="mt-7 w-full flex justify-center">
                    <img
                        className="rounded-xl max-h-96"
                        src={imgSrc || ""}
                        alt={prompt}
                    ></img>
                    </div>
                    <p className="mb-7 mt-4 text-center text-base">{prompt}</p>
                </div>

                <div className="modal-action">
                    {isCopied ? (
                    <button
                        type="button"
                        className="btn btn-ghost gap-2 disabled capitalize bg-purple-500 border-none hover:bg-purple-500 text-white"
                    >
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        >
                        <path
                            fill="currentColor"
                            d="M21 7L9 19l-5.5-5.5l1.41-1.41L9 16.17L19.59 5.59L21 7Z"
                        />
                        </svg>
                        Copied
                    </button>
                    ) : (
                    <button
                        type="button"
                        className="btn gap-2 capitalize btn-outline border border-purple-600 hover:bg-purple-500 text-purple-600"
                        onClick={() => handleCopyImage(imgSrc)}
                    >
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        >
                        <path
                            fill="currentColor"
                            d="M5 22q-.825 0-1.413-.588T3 20V6h2v14h11v2H5Zm4-4q-.825 0-1.413-.588T7 16V4q0-.825.588-1.413T9 2h9q.825 0 1.413.588T20 4v12q0 .825-.588 1.413T18 18H9Zm0-2h9V4H9v12Zm0 0V4v12Z"
                        />
                        </svg>
                        Copy
                    </button>
                    )}

                    {isDownloaded ? (
                    <button
                        type="button"
                        className="btn gap-2 disabled capitalize bg-purple-500 border-none hover:bg-purple-500 text-white"
                    >
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        >
                        <path
                            fill="currentColor"
                            d="M21 7L9 19l-5.5-5.5l1.41-1.41L9 16.17L19.59 5.59L21 7Z"
                        />
                        </svg>
                        Downloaded
                    </button>
                    ) : (
                    <button
                        type="button"
                        className="btn gap-2 capitalize border-none bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-2 focus:outline-none focus:ring-purple-200"
                        onClick={() => handleDownload(imgSrc)}
                    >
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        >
                        <path
                            fill="currentColor"
                            d="M6 20q-.825 0-1.413-.588T4 18v-3h2v3h12v-3h2v3q0 .825-.588 1.413T18 20H6Zm6-4l-5-5l1.4-1.45l2.6 2.6V4h2v8.15l2.6-2.6L17 11l-5 5Z"
                        />
                        </svg>
                        Download
                    </button>
                    )}
                </div>
                </div>
            </div>
        </>
    );
}


export default GeneratedImageModal;