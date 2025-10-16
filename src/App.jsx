import Displayer from './components/calculator/Displayer';
import Operators from './components/calculator/Operators';
import Numbers from './components/calculator/Numbers';
import './App.styles.scss';
import { useEffect, useReducer } from 'react';
import Main from './components/Main';

const initialState = {
	x: 0,
	y: null,
	operator: null,
	result: null,
	displayer: 0,
	nextOperator: null,
	operationList: [],
};

function reducer(state, action) {
	switch (action.type) {
		case 'setDisplayer':
			return {
				...state,
				displayer:
					state.operationList.length !== 0 && state.operator !== null
						? `${
								state.operationList.at(state.operationList.length - 1).result
						  } ${state.operator} `
						: state.x,
			};
		case 'setNumber': {
			return {
				...state,
				x:
					state.operator === null
						? state.displayer !== 0
							? `${state.displayer}${getNumbers(
									state.displayer,
									action.payload
							  )}`
							: state.displayer + getNumbers(state.displayer, action.payload)
						: state.x,
				y:
					state.x !== null && state.operator !== null
						? state.y !== null
							? `${state.y}${getNumbers(state.displayer, action.payload)}`
							: getNumbers(state.displayer, action.payload)
						: null,
				displayer:
					state.displayer !== 0
						? `${state.displayer}${getNumbers(state.displayer, action.payload)}`
						: state.displayer + getNumbers(state.displayer, action.payload),
			};
		}
		case 'setOperator':
			return {
				...state,
				operator: action.payload !== '=' ? action.payload : null,
				nextOperator:
					state.operator !== null && state.y !== null ? action.payload : null,
				displayer:
					state.displayer !== null &&
					action.payload !== '=' &&
					!String(state.displayer).includes(' ')
						? `${state.displayer} ${action.payload} `
						: state.displayer,
			};

		case 'calculate':
			return {
				...state,
				result:
					state.y !== null
						? calculate(state.x, state.y, state.operator)
						: state.result,
			};

		case 'getResult':
			return {
				...state,
				displayer: state.result !== null ? state.result : state.displayer,
			};

		case 'operationList':
			// console.log('hi');
			return {
				...state,
				operationList: [
					...state.operationList,
					{
						x: Number(state.x),
						y: Number(state.y),
						operator: state.operator,
						result: state.result,
					},
				],
			};

		case 'setNext':
			return {
				...state,
				x:
					state.operationList.length !== 0
						? state.operationList.at(state.operationList.length - 1).result
						: state.result,
				operator: state.nextOperator === '=' ? null : state.nextOperator,
				nextOperator: null,
			};

		case 'reset':
			return {
				...state,
				x: 0,
				y: null,
				operator: null,
				result: null,
				displayer: 0,
				nextOperator: null,
			};

		default:
			throw new Error('Unknown action');
	}
}

function calculate(x, y, operator) {
	if (y === null) return;

	switch (operator) {
		case '-':
			return Number(x) - Number(y);
		case '+':
			console.log(x, y);
			return Number(x) + Number(y);
		case '*':
			return Number(x) * Number(y);
		case '/':
			return Number(x) / Number(y);
		default:
			throw new Error('unknown action');
	}
}

function getNumbers(displayer, n) {
	if (
		n === '.' &&
		!String(displayer).includes(' ') &&
		String(displayer).indexOf(n) === 1
	)
		return '';

	if (
		n === '.' &&
		String(displayer).includes(' ') &&
		String(displayer).lastIndexOf(n) > 2
	)
		return '';

	return n;
}

export default function App() {
	const [state, dispatch] = useReducer(reducer, initialState);

	const { displayer, result, nextOperator, y } = state;

	useEffect(
		function () {
			if (nextOperator !== null && result === null && y !== null) {
				dispatch({ type: 'calculate' });
				dispatch({ type: 'operationList' });
				dispatch({ type: 'reset' });
				dispatch({ type: 'setNext' });
				dispatch({ type: 'setDisplayer' });
			}
		},
		[nextOperator, result, y]
	);

	return (
		<>
			<div id='calculator'>
				<Displayer displayer={displayer} />
				<Main>
					<Numbers dispatch={dispatch} />
					<Operators dispatch={dispatch} />
				</Main>
			</div>
		</>
	);
}
