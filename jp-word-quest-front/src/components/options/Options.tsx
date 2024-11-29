import { useEffect, useRef, useState } from "react";
import { IRefPhaserGame } from "../../game/PhaserGame";
import SingleOption from "./option/SingleOption";
import './Options.css';

export type RefType = {
    phaserRef: React.MutableRefObject<IRefPhaserGame | null>
}

const Options = ({ phaserRef }: RefType) => {
    const [optionsStyle, updateOptionsStyle] = useState<React.CSSProperties>();
    const optionsContainer = useRef<HTMLDivElement | null>(null);

    const updateStyle = () => {
        let setTopLeftWidth = { //setup width left and top first
            ...calculateOptionPositioning()
        }

        if(!setTopLeftWidth.top) return {};
        let height = calculateOptionHeight(setTopLeftWidth.top); //calculate height after we have positioned

        updateOptionsStyle({...updateOptionsStyle, ...setTopLeftWidth, ...height , position: "absolute", color: 'red', zIndex: 500 }); //set width and height after
    }

    const calculateOptionPositioning = () => {
        const currentCanvas = phaserRef.current?.game?.canvas;
        if (!currentCanvas || !optionsContainer.current) return {};
    
        const canvasRect = currentCanvas.getBoundingClientRect();
    
        const heightOfCanvas = canvasRect.height;
        const widthOfCanvas = canvasRect.width;
    
        return {
            top: canvasRect.bottom - heightOfCanvas * 0.2,
            left: canvasRect.left,
            width: widthOfCanvas
        };
    };

    const calculateOptionHeight = (top: number) => {
        const currentCanvas = phaserRef.current?.game?.canvas;
        if (!currentCanvas || !optionsContainer.current) return {};
    
        const canvasRect = currentCanvas.getBoundingClientRect();
    
        return {
            height: canvasRect.bottom - top,
        };
    }

    const handleResize = () => {
        updateStyle();
    }

    /*useEffect(() => {
        updateStyle();
    },[phaserRef.current?.game?.canvas.height, phaserRef.current?.game?.canvas.width]);*/

    useEffect(() => {
        window.addEventListener("resize", handleResize); //handles resizing
        window.addEventListener("load", handleResize); //handles assigning position of buttons on startup

        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("load", handleResize);
        };
    },[])

    return(
        <div className="options-container" ref={optionsContainer} style={optionsStyle}>
            {
                optionsStyle && (
                    <SingleOption phaserRef={phaserRef} />
                )
            }
        </div>
    )
}

export default Options;