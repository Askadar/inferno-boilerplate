import { Link } from 'inferno-router';
import Component from 'inferno-component';

export default class Nav extends Component {
	constructor(p) {
		super(p);
		this.state = {
			links: [
				{ to: '/', label: 'Home' },
				{ to: '/catalogue/all', label: 'Catalogue', children: [
					{ to: '/catalogue/1', label: 'Filpos' },
					{ to: '/catalogue/2', label: 'Laughenballzen' },
					{ to: '/catalogue/3', label: 'Trollzen' },
				] },
				{ to: '/contact', label: 'Contact info' },
				{ to: '/faq', label: 'FAQ' },
			],
			active: this.context.router && this.context.router.url
		};
	}
	componentWillMount() {
		this.setState({ active: this.context.router && this.context.router.url });
	}
	onClick() {
		setTimeout(() => {this.setState({ active: this.context.router.url });}, 5);
	}
	render() {
		const { links, active } = this.state;
		const a = link =>
		<li className={link.to === active ? 'active' : null}>
			<Link to={link.to} onClick={this.onClick.bind(this)}>{link.label}</Link>
			{link.children ? <ul className="nav sub-nav">{link.children.map(a)}</ul> : null}
		</li>;
		return(
			<div className="container">
				<ul className="nav nav-pills">
					{links.map(a)}
				</ul>
				<i className="nav-burger"></i>
			</div>);
	}
}
