import Component from 'inferno-component';
import Nav from './Nav';
import Logo from './Logo';

class App extends Component {
	constructor(p) {
		super(p);
		this.version = 'boilerplate';
	}
	render({ children }) {
		return(
			<div className="root">
				<header className="container-fluid">
					<div className="container">
							<Logo/>
						</div>
				</header>
				<nav className="container-fluid">
					<Nav/>
				</nav>
				<section className="main container-fluid">
					<div className="content container">
						{children}
					</div>
				</section>
			</div>
		);
	}
}

export default App;
