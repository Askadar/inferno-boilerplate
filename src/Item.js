import { Link } from 'inferno-router';

export default function Item({ name, id, imgFolder, imgCount, short, category, manufacturer, price }) {

	if (short)
		return (
			<div className='item col-sm-3 short'>
				<Link to={`${category}/${id}`}>
					<aside>
							<figure>
								<img src={imgFolder + 'full_001.jpg'} alt=""/>
						</figure>
					</aside>
					<article className="item-description">
						<h3>{name}!</h3>
					</article>
				</Link>
			</div>
		);
	return (
		<div className='item'>
			<div><Link to={'/catalogue/' + category}>Back</Link></div>
			<article className="item-description">
				<h2>{name}!</h2>
				<p className="price">Only: {price} BYN</p>
				<p className="manufacturer">Produced by: {manufacturer}</p>
				<aside>
					<figure>
						{
							[...Array(imgCount).keys()]
							.map((a, i) =>
							<img src={`${imgFolder}full_${('00' + (+i + 1)).slice(-3)}.jpg`} className="col-sm-3" alt={name + i + 1}/>)
						}
					</figure>
				</aside>
				<p>Plush toy!</p>
			</article>
		</div>
	);
}
