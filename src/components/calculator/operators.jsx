

function Operators({ dispatch }) {
	function handleAction(e) {
		dispatch({
			type: 'setOperator',
			payload: e.target.textContent,
		});
	}

	return (
		<ul id='operators'>
			<li onClick={e => handleAction(e)}>*</li>
			<li onClick={e => handleAction(e)}>/</li>
			<li onClick={e => handleAction(e)}>-</li>
			<li
				className='tall'
				onClick={e => handleAction(e)}
			>
				=
			</li>
			<li onClick={e => handleAction(e)}>+</li>
		</ul>
	);
}

export default Operators
