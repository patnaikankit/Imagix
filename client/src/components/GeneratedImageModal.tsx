// to allow the user to copy and download the generated image
import { Dispatch, SetStateAction } from "react";
import { ImageModalState } from "../types/type";
import { useState, useRef } from "react";
import classNames from "classnames";


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


    return(
        <>
            <div className={classNames("modal", "backdrop-blur-sm", {
                "modal-open": open,
                })}>

            </div>
        </>
    );
}


export default GeneratedImageModal;