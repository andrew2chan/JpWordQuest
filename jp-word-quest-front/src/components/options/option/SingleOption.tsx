import { RefType, SingleOptionType } from "../Options";
import './SingleOption.css';

type SingleOptionRefType = {
    options: SingleOptionType[]
}

const SingleOption = ({ options }: SingleOptionRefType) => {
    return (
        <>
            {
                options.map((option) => {
                    return (
                        <button className="option" id={option.id} style={{...option.style}} key={option.id}>
                            {option.vocab}
                        </button>
                    )
                })
            }
        </>
    )
}

export default SingleOption;