

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
					onClick={() => {
						dispatch({ type: 'calculate' });
						dispatch({ type: 'operationList' });
						dispatch({ type: 'reset' });
						dispatch({ type: 'setNext' });
						dispatch({ type: 'setDisplayer' });
					}}
				>
					=
				</li>
				<li onClick={e => handleAction(e)}>+</li>
			</ul>
		);
}

export default Operators
