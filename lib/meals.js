import fs from 'node:fs';
import sql from 'better-sqlite3';
import slugify from 'slugify';
import xss from 'xss';

const db = sql('meals.db');

export const getMeals = async () => {
	await new Promise((resolve) => setTimeout(resolve, 2000));

	// throw new Error('Error fetching meals');
	return db.prepare('SELECT * FROM meals').all();
};

export const getMealDetails = (slug) => {
	return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug);
};

export async function saveMeal(meal) {
	meal.slug = slugify(meal.title, { lower: true });
	meal.instructions = xss(meal.instructions);

	const extension = meal.image.name.split('.').pop();
	const filename = `${meal.slug}.${extension}`;

	const stream = fs.createWriteStream(`public/images/${filename}`);
	const bufferedImage = await meal.image.arrayBuffer();
	stream.write(Buffer.from(bufferedImage), (error) => {
		if (error) {
			throw new Error('Saving image failed');
		}
	});

	meal.image = `/images/${filename}`;

	db.prepare(
		`INSERT INTO meals
      (title, summary, instructions, creator, creator_email, image, slug)
      VALUES (
        @title,
        @summary,
        @instructions,
        @creator,
        @creator_email,
        @image,
        @slug
      )
      `
	).run(meal);
}

export const deleteMeal = (slug) => {
	// Find the meal by slug
	const meal = db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug);

	if (!meal) {
		throw new Error('Meal not found');
	}

	// Delete the associated image file
	const imagePath = `public${meal.image}`;
	fs.unlink(imagePath, (err) => {
		if (err) {
			console.error('Error deleting image:', err);
			throw new Error('Failed to delete image file');
		}
		console.log('Image deleted successfully:', imagePath);
	});

	// Delete the meal record from the database
	db.prepare('DELETE FROM meals WHERE slug = ?').run(slug);
	console.log('Meal deleted successfully');
};
