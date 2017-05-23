import { Link } from 'inferno-router';

export default function Error({ id }) {
	return (
		<div>
			<p>Not found such item.</p>
			<p><Link to="/catalogue/all">Return to catalogue</Link></p>
		</div>);
}
