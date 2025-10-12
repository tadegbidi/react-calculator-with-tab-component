

function Numbers({ dispatch }) {
	const numbers = Array.from({ length: 9 }, (_, i) => i + 1);

	function handleAction(e) {
		dispatch({ type: 'setNumber', payload: Number(e.target.textContent) });
	}

	return (
		<ul id='numbers'>
			{numbers.map(n => (
				<li
					key={n}
					onClick={e => handleAction(e)}
				>
					{n}
				</li>
			))}
			<li
				onClick={e =>
					dispatch({ type: 'setNumber', payload: e.target.textContent })
				}
			>
				c
			</li>
			<li onClick={e => handleAction(e)}>0</li>
			<li
				onClick={e =>
					dispatch({ type: 'setNumber', payload: e.target.textContent })
				}
			>
				.
			</li>
		</ul>
	);
}

export default Numbers
