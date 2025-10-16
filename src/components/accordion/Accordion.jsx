import { useState } from "react";


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

function Accordion() {
    const [tab, setTab] = useState(1);

	function handleTab(id) {
		setTab(id);
	}
    return (
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
    )
}

export default Accordion
