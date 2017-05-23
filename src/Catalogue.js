import { version } from 'inferno';
import Component from 'inferno-component';
import Item from './Item';
import Error404 from './Error404';
import axios from 'axios';

export default class Catalogue extends Component {
	constructor(p) {
		super(p);
		this.state = {
			assetsLink: p.assetsLink || '/assets/assets.json',
			items: [
				// { name: 'Filpon 1', imgFolder: '/assets/filpo1/', imgCount: 3 },
				// { name: 'Filpon 2', imgFolder: '/assets/filpo2/', imgCount: 3 },
				// { name: 'Laughenballzen', imgFolder: '/assets/laughballz/', imgCount: 10 },
				// { name: 'Trollerz', imgFolder: '/assets/trolls/', imgCount: 6 }
			],
			minPrice: 0,
			maxPrice: 1,
			from: 0,
			to: 1,
			manufacturers: {},
			selectedManufacturers: {}
		};
	}
	componentWillMount() {
		axios.get(this.state.assetsLink)
		.then(resp => {
			let minPrice = 0, maxPrice = 1, manufacturers = {};
			resp.data.forEach(item => {
				minPrice = Math.min(+item.price, minPrice);
				maxPrice = Math.max(+item.price, maxPrice);
				manufacturers[item.manufacturer] = true;
			});
			this.setState({ items: resp.data, minPrice, maxPrice, manufacturers, selectedManufacturers: { ...manufacturers }, from: minPrice, to: maxPrice });
		})
		.catch(err => {
			console.error('error on fetching catalogue', err);
		});
	}
	priceFilter({ target }) {
		let newState = {};
		newState[target.name] = +target.value;
		this.setState(newState);
	}
	manufFilter({ target }) {
		let zag = {};
		zag[target.name] = target.checked;
		this.setState({ selectedManufacturers: { ...this.state.selectedManufacturers, ...zag } });
	}
	render() {
		const { items, minPrice, maxPrice, manufacturers, selectedManufacturers, from, to } = this.state;
		const { category, itemId } = this.props.params;
		const activeFilter = item =>
			((category && (category === 'all' || item.category === +category)) || !category)
			&& ((from && (from <= item.price)) || !from)
			&& ((to && (to >= item.price)) || !to)
			&& ((selectedManufacturers && selectedManufacturers[item.manufacturer]) || !selectedManufacturers);
		return (
			<div className="catalogue">
				{ !itemId &&
				<div className="filter">
					<h3>Filters</h3>
					<p>
						<label>Price from [{minPrice}]: <input type="number" min={minPrice} max={Math.min(maxPrice, to)} name="from" onChange={this.priceFilter.bind(this)}/>
						</label>
					</p>
					<p>
						<label>Price to [{maxPrice}]: <input type="number" min={Math.max(minPrice, from)} max={maxPrice} name="to" onChange={this.priceFilter.bind(this)}/></label>
					</p>
					<ul style={{ listStyle: 'none', paddingLeft: 0 }}>
						<li>Selected manufacturers:</li>
						{Object.keys(manufacturers).map(manuf =>
							<li>
								<label>{manuf}<input type="checkbox" onChange={this.manufFilter.bind(this)} checked={selectedManufacturers[manuf]} name={manuf}/></label>
							</li>)
						}
					</ul>
				</div>}
				{
					itemId ?
						items.some(item => item.id === +itemId) ?
						<Item {...items.find(item => item.id === +itemId)} category={category}/> : <Error404 id={itemId}/>
						: <div>
							<h3>Items</h3>
							{ items
								.filter(activeFilter)
								.map(item =>
								<Item {...item} category={category} short/>
							)}
						</div>
				}

			</div>
		);
	}
}
