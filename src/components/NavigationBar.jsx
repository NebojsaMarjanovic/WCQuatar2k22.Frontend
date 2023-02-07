import {useState} from 'react';
import { Link } from 'react-router-dom';

function NavigationBar() {
	const [open, setOpen] = useState(false);

	return (
		<div className='topnav'>
			<Link to="" className="stavka">Početna </Link>
			<Link to ="/grupnaFaza" className="stavka">Evidencija grupa</Link>
			<Link to ="/zakaziUtakmicu" className="stavka">Zakaži utakmicu</Link>
			<Link to ="/utakmice" className="stavka">Pregled utakmica</Link>
		</div>		
	);
}

export default NavigationBar;
