import { IRequest } from 'itty-router';
import { Env } from '../env';

const getImages = async (request: IRequest, env: Env) => {
	const limit = request.query.count ? request.query.count[0] : 10;
	let results;

	try {
		results = await env.DB.prepare(
			`
      SELECT i.*, c.display_name AS category_display_name
      FROM images i
      INNER JOIN image_categories c ON i.category_id = c.id
      ORDER BY created_at DESC
      LIMIT ?1`
		)
			.bind(limit)
			.all();
	} catch (e) {
		let message;
		if (e instanceof Error) message = e.message;

		console.log({
			message: message,
		});

		return new Response('Error', { status: 500 });
	}

	if (!results.success) {
		return new Response('There was a problem retrieving images', {
			status: 500,
		});
	}

	return new Response(JSON.stringify(results.results), {
		headers: { 'Content-type': 'application/json' },
	});
};

export default getImages;
