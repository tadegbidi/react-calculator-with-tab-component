import Displayer from "./components/calculator/displayer";
import Operators from "./components/calculator/operators";
import Numbers from "./components/calculator/numbers";
import './App.styles.scss';
import { useEffect, useState } from 'react';
// import useKey from "./hooks/useKey";

const initialState = {
	x: 0,
	y: null,
	operator: null,
	result: null,
};

const infos = [
	{
		id: 1,
		title: 'menu 1',
		description: 'Combo 1. continue reading...',
	},
	{
		id: 2,
		title: 'menu 2',
		description: 'Combo 2',
	},
	{
		id: 3,
		title: 'menu 3',
		description: 'Combo 3',
	},
];

export default function App() {
	const [calc, setCalc] = useState(initialState);
	const [x, setX] = useState(null);
	const [y, setY] = useState(null);
	const [result, setResult] = useState(null);
	const [operator, setOperator] = useState(null);
	const [temporaryOperator, setTemporaryOperator] = useState(null);
	const [displayer, setDisplayer] = useState(0);
	const [point, setPoint] = useState(1);

	const [operationList, setOperationList] = useState([]);

	const [tab, setTab] = useState(1);

	// useEffect(function() {
	//   document.body.style.background = 'blue';
	// }, [])

	function handleNumbers(e) {
		const val = e.target.textContent;

		switch (val) {
			case '0':
				if (displayer !== '0' || displayer !== 0) setDisplayer(x => (x += val));
				break;
			case 'c':
				setDisplayer(0);
				break;
			case '.':
				if (
					point > 2 ||
					(String(displayer).includes('.') && !String(displayer).includes(' '))
				)
					return;
				setPoint(p => (p += 1));
				setDisplayer(x => (x = x + val));
				break;
			default:
				displayer === 0
					? setDisplayer(x => Number(x) + Number(val))
					: setDisplayer(x => (x += val));
				return;
		}
	}

	function handleOperator(e) {
		// console.log(e.target);
		const action = e.target === undefined ? e : e.target.textContent;
		console.log(action);

		if (action !== '=' && y === null && operator === null) {
			setX(() => displayer);
			setOperator(() => action);
			setDisplayer(d => (d += ` ${action} `));
			console.log('step 1');
			return;
		}

		if (operator !== null && y === null) {
			console.log(operator);
			setResult(() => null);
			// find the position and extract second number from displayer
			let index = displayer.indexOf(operator);
			let num = displayer.slice(index + 1, displayer.length);
			// set second number to Y
			setY(() => Number(num));
			// set next operation action
			setTemporaryOperator(() => action);
			console.log('step 2');
		}
	}

	function calculate() {
		let op = operator;
		let res;

		switch (op) {
			case '-':
				res = Number(x) - Number(y);
				// console.log(res);
				break;
			case '+':
				res = Number(x) + Number(y);
				break;
			case '/':
				res = Number(x) / Number(y);
				break;
			case '*':
				res = Number(x) * Number(y);
				break;
			case '=':
				res = result === null ? displayer : Number(result);
				break;
			default:
				return res;
		}

		console.log(res);

		setResult(res);
		setPoint(0);
		setCalc(calc => ({ ...calc, x, y, result: res, operator }));
		setDisplayer(() => res);
		console.log('step 3');
	}

	function handleTab(id) {
		setTab(id);
	}

	useEffect(
		function () {
			if (x !== null && y !== null && operator !== null) {
				calculate();
				setY(() => null);
				setOperator(() => null);
			}

			if (calc.result !== null) {
				console.log(calc);
				setOperationList(lists => [...lists, calc]);
				setX(() => result);
				setCalc(calc => ({ ...calc, ...initialState }));
				handleOperator(temporaryOperator);

				console.log('step 4');
			}
			// handleOperator(operator);
			console.log(operationList);
			// return () => {}
		},
		[y, result]
	);

	// useKey('Escape');

	return (
		<>
			<div id='calculator'>
				<header>
					<Displayer display={displayer} />
				</header>
				<main>
					<Numbers onHandler={handleNumbers} />
					<Operators onHandler={handleOperator} />
				</main>
			</div>

			<div id='accordion'>
				<ul id='tabs'>
					{infos.map(el => (
						<li
							key={el.id}
							className={el.id === tab ? 'active' : ''}
							onClick={() => handleTab(el.id)}
						>
							{el.title}
						</li>
					))}
				</ul>
				<div id='tabs-content'>
					{infos.map(
						el => el.id === tab && <p key={el.id}>{el.description}</p>
					)}
				</div>
			</div>
		</>
	);
}