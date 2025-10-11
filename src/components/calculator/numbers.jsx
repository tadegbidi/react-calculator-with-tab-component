

function Numbers({ onHandler }) {

    const numbers = Array.from({length: 9}, (_, i) => i + 1);

    return (
        
        <ul id="numbers">
            {numbers.map(n => <li key={n} onClick={(e) => onHandler(e)}>{n}</li>)}
            <li onClick={(e) => onHandler(e)}>c</li>
            <li onClick={(e) => onHandler(e)}>0</li>
            <li onClick={(e) => onHandler(e)}>.</li>
        </ul>
            
    )
}

export default Numbers
