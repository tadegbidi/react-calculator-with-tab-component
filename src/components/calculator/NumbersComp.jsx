import styles from './numbers.module.css';

function NumbersComp({ dispatch }) {
	const numbers = Array.from({ length: 9 }, (_, i) => i + 1);

	function handleAction(e) {
		e.target.textContent === 'c'
			? dispatch({ type: 'reset' })
			: dispatch({ type: 'setNumber', payload: Number(e.target.textContent) });
	}

	return (
		<ul className={styles.numbers}>
			{numbers
				.sort((a, b) => b - a)
				.map(n => (
					<li
						key={n}
						onClick={e => handleAction(e)}
					>
						{n}
					</li>
				))}
			<li onClick={e => handleAction(e)}>c</li>
			<li onClick={() => dispatch({ type: 'setNumber', payload: 0 })}>0</li>
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

export default NumbersComp;
