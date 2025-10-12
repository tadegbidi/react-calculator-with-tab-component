import Displayer from './components/calculator/Displayer';
import Operators from './components/calculator/Operators';
import Numbers from './components/calculator/Numbers';
import './App.styles.scss';
import { useEffect, useReducer, useState } from 'react';
import Main from './components/Main';

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
					state.operationList.length !== 0
						? `${
								state.operationList.at(state.operationList.length - 1).result
						  } ${state.operator} `
						: state.displayer + action.payload,
			};
		case 'setNumber': {
			return {
				...state,
				x:
					state.operator === null
						? state.displayer !== 0
							? `${state.displayer}${action.payload}`
							: state.displayer + action.payload
						: state.x,
				y:
					state.x !== null && state.operator !== null
						? state.y !== null
							? `${state.y}${action.payload}`
							: action.payload
						: null,
				displayer:
					state.displayer !== 0
						? `${state.displayer}${action.payload}`
						: state.displayer + action.payload,
			};
		}
		case 'setOperator':
			return {
				...state,
				operator: state.operator !== null ? state.operator : action.payload,
				nextOperator: state.operator !== null ? action.payload : null,
				displayer: `${state.displayer} ${action.payload} `,
			};

		case 'calculate':
			return {
				...state,
				result: calculate(state.x, state.y, state.operator),
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
				x: state.operationList.at(state.operationList.length - 1).result,
				operator: state.nextOperator,
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
			};

		default:
			throw new Error('Unknown action');
	}
}

function calculate(x, y, operator) {
	// console.log(x, y, operator);
	switch (operator) {
		case '-':
			return Number(x) - Number(y);
		case '+':
			return Number(x) + Number(y);
		case '*':
			return Number(x) * Number(y);
		case '/':
			return Number(x) / Number(y);
		default:
			throw new Error('unknown action');
	}
}

export default function App() {
	const [state, dispatch] = useReducer(reducer, initialState);

	const { displayer, result, nextOperator } = state;

	const [tab, setTab] = useState(1);

	function handleTab(id) {
		setTab(id);
	}

	useEffect(
		function () {
			if (nextOperator !== null && result == null) {
				dispatch({ type: 'calculate' });
				dispatch({ type: 'operationList' });
				dispatch({ type: 'reset' });
				dispatch({ type: 'setNext' });
				dispatch({ type: 'setDisplayer' });
			}
		},
		[nextOperator, result]
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
