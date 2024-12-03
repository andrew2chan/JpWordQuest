import { useEffect, useRef, useState } from "react";
import { IRefPhaserGame } from "../../game/PhaserGame";
import SingleOption from "./option/SingleOption";
import './Options.css';
import { fetchGetOptions } from "../../helpers/fetch";

export type RefType = {
    phaserRef: React.MutableRefObject<IRefPhaserGame | null>
}

export type SingleOptionType = {
    id: string;
    style: React.CSSProperties
    furigana: string;
    jlpt: string;
    word: string;
    vocab: string;
    correct: boolean;
}

const Options = ({ phaserRef }: RefType) => {
    const [optionsStyleContainer, updateOptionsStyleContainer] = useState<React.CSSProperties>();
    const optionsContainer = useRef<HTMLDivElement | null>(null);
    const [options, updateOptions] = useState<SingleOptionType[]>([
        {
            id: "option1",
            style: {
                background: "radial-gradient(circle at 100% 100%, #B0E0E6, #E6E6FA, #FFDAB9)",
                fontSize: "1.1em"
            },
            furigana: "",
            jlpt: "",
            word: "",
            vocab: "",
            correct: false
        },
        {
            id: "option2",
            style: {
                background: "radial-gradient(circle at 0% 100%, #B0E0E6, #E6E6FA, #FFDAB9)",
                fontSize: "1.1em"
            },
            furigana: "",
            jlpt: "",
            word: "",
            vocab: "",
            correct: false
        },
        {
            id: "option3",
            style: {
                background: "radial-gradient(circle at 100% 0, #B0E0E6, #E6E6FA, #FFDAB9)",
                fontSize: "1.1em"
            },
            furigana: "",
            jlpt: "",
            word: "",
            vocab: "",
            correct: false
        },
        {
            id: "option4",
            style: {
                background: "radial-gradient(circle at 0% 0%, #B0E0E6, #E6E6FA, #FFDAB9)",
                fontSize: "1.1em"
            },
            furigana: "",
            jlpt: "",
            word: "",
            vocab: "",
            correct: false
        }
    ]);

    const fetchAndSetOptionText = () => {
        fetchGetOptions("JLPT4").then((data) => { //get options
            let currentCorrectAnswer = Math.floor(Math.random() * data.length); //sets the current correct answer which is chosen randomly

            updateOptions((prevState) => { //load in previous state (array)
                return prevState.map((option, index) => { //map through the array
                    return { //set the new text for each option
                        ...option,
                        vocab: data[index].vocab,
                        furigana: data[index].furigana,
                        jlpt: data[index].jlpt,
                        word: data[index].word,
                        correct: currentCorrectAnswer == index ? true : false
                    }
                })
            });
        })
    }

    useEffect(() => {
        fetchAndSetOptionText();
    }, [])

    const updateStyle = () => {
        let setTopLeftWidth = { //setup width left and top first
            ...calculateOptionPositioning()
        }

        if(!setTopLeftWidth.top) return {};
        let height = calculateOptionHeight(setTopLeftWidth.top); //calculate height after we have positioned

        updateOptionsStyleContainer({...updateOptionsStyleContainer, ...setTopLeftWidth, ...height , position: "absolute", color: 'red', zIndex: 500 }); //set width and height after
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

    useEffect(() => {
        phaserRef.current?.game?.scale.on("resize", handleResize); //listens to the phaser resize event

        return () => {
            phaserRef.current?.game?.scale.off("resize", handleResize); //remove event listener in the case of unmount
        }
    },[])

    return(
        <div className="options-container" ref={optionsContainer} style={optionsStyleContainer}>
            {
                optionsStyleContainer && (
                    <>
                        <SingleOption options={options}/>
                    </>
                )
            }
        </div>
    )
}

export default Options;