'use server';

import { redirect } from 'next/navigation';
import { saveMeal } from './meals';
import { revalidatePath } from 'next/cache';

function isInvalidText(input) {
	return !input || input.trim() === '';
}

export const shareMeal = async (prevState, formData) => {
	const meal = {
		creator: formData.get('name'),
		creator_email: formData.get('email'),
		title: formData.get('title'),
		summary: formData.get('summary'),
		instructions: formData.get('instructions'),
		image: await formData.get('image'),
	};
	console.log('Form submitted!', meal);

	if (
		isInvalidText(meal.creator) ||
		isInvalidText(meal.creator_email) ||
		isInvalidText(meal.title) ||
		isInvalidText(meal.summary) ||
		isInvalidText(meal.instructions) ||
		!meal.creator_email.includes('@') ||
		!meal.image ||
		meal.image.size === 0
	) {
		return {
			message: 'Invalid input',
		};
	}

	await saveMeal(meal);
	revalidatePath('/meals');
	redirect('/meals');
};
