import { ALL_IMAGES } from '../data/image_store';
import { IRequest } from 'itty-router';

const createImage = async (request: IRequest) => {
	const imageRequest = await request.json();

	const newImage = {
		id: parseInt(imageRequest.id),
		url: imageRequest.url,
		author: imageRequest.author,
	};

	ALL_IMAGES.unshift(newImage);

	return new Response(JSON.stringify(newImage), {
		status: 201,
		headers: { 'content-type': 'application/json' },
	});
};

export default createImage;
