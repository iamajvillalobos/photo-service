import { IRequest } from 'itty-router';
import { Env } from '../env';

const createImage = async (request: IRequest, env: Env) => {
	const json = await request.json();
	let result;

	try {
		result = await env.DB.prepare(
			`
			INSERT INTO images
			(category_id, user_id, image_url, title, format, resolution, file_size_bytes)
			VALUES
			(?1, ?2, ?3, ?4, ?5, ?6, ?7)`
		)
			.bind(
				json.category_id,
				json.user_id,
				json.image_url,
				json.title,
				json.format,
				json.resolution,
				json.file_size_bytes
			)
			.run();
	} catch (e) {
		let message;
		if (e instanceof Error) message = e.message;

		console.log({
			message: message,
		});

		return new Response('Error', { status: 500 });
	}

	if (!result.success) {
		return new Response('An error occured', {
			status: 500,
		});
	}

	return new Response(JSON.stringify(json), {
		status: 201,
		headers: { 'Content-type': 'application/json' },
	});
};

export default createImage;
