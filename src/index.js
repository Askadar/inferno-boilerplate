// inferno module
import { render } from 'inferno';
//
// routing modules
import { Router, Route } from 'inferno-router';
import createBrowserHistory from 'history/createBrowserHistory';

// app components
import App from './App';
import Faq from './Faq';
import Home from './Home';
import Catalogue from './Catalogue';
import Item from './Item';
import Contact from './Contact';
import VersionComponent from './VersionComponent';

if (module.hot)
	require('inferno-devtools');

const browserHistory = createBrowserHistory();

const routes = (
	<Router history={ browserHistory }>
		<Route component={ App }>
			<Route path="/" component={ Home } />
			<Route path="/catalogue/:category" component={ Catalogue } >
				<Route path="/catalogue/:category/:itemId" component={ Item } />
			</Route>
			<Route path="/contact" component={ Contact } />
			<Route path="/faq" component={ Faq } />
		</Route>
	</Router>
);

render(
	routes,
	document.getElementById('app'));

if (module.hot)
	module.hot.accept();
