import { ALL_IMAGES } from '../data/image_store';
import { IRequest } from 'itty-router';

const getSingleImage = (request: IRequest) => {
	let image = ALL_IMAGES.find((i) => i.id.toString() == request.params.id);

	if (!image) {
		return new Response('Not found', { status: 404 });
	}

	return new Response(JSON.stringify(image), {
		headers: { 'content-type': 'application/json' },
	});
};

export default getSingleImage;
