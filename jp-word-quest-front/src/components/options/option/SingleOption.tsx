import { RefType } from "../Options";
import './SingleOption.css';

const SingleOption = ({ phaserRef }: RefType) => {
    return (
        <>
            <button className="option" style={{ background: "radial-gradient(circle at 100% 100%, #B0E0E6, #E6E6FA, #FFDAB9)" }} >
                test
            </button>
            <button className="option" style={{ background: "radial-gradient(circle at 0% 100%, #B0E0E6, #E6E6FA, #FFDAB9)" }} >
                test
            </button>
            <button className="option" style={{ background: "radial-gradient(circle at 100% 0, #B0E0E6, #E6E6FA, #FFDAB9)" }} >
                test
            </button>
            <button className="option" style={{ background: "radial-gradient(circle at 0% 0%, #B0E0E6, #E6E6FA, #FFDAB9)" }} >
                test
            </button>
        </>
    )
}

export default SingleOption;