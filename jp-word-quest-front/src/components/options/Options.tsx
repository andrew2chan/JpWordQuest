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
        phaserRef.current?.game?.scale.on("resize", handleResize); //listens to the phaser resize event

        return () => {
            phaserRef.current?.game?.scale.off("resize", handleResize); //remove event listener in the case of unmount
        }
    },[])

    return(
        <div className="options-container" ref={optionsContainer} style={optionsStyle}>
            {
                optionsStyle && (
                    <>
                        <SingleOption phaserRef={phaserRef} />
                    </>
                )
            }
        </div>
    )
}

export default Options;