

function Operators({ onHandler }) {
    return (
        <ul id="operators">
            <li onClick={e => onHandler(e)}>*</li>
            <li onClick={e => onHandler(e)}>/</li>
            <li onClick={e => onHandler(e)}>-</li>
            <li className="tall" onClick={e => onHandler(e)}>=</li>
            <li onClick={e => onHandler(e)}>+</li>
        </ul>
    )
}

export default Operators
