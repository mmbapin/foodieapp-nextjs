'use server';

export const shareMeal = async (formData) => {
	const meal = {
		creator: formData.get('name'),
		creator_email: formData.get('email'),
		title: formData.get('title'),
		summary: formData.get('summary'),
		instructions: formData.get('instructions'),
		image: await formData.get('image'),
	};
	console.log('Form submitted!', meal);
};
