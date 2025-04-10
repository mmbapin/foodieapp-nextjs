'use client';
import React from 'react';
import classes from './image-picker.module.css';
import { useRef, useState } from 'react';
import Image from 'next/image';

const ImagePicker = ({ label, name }) => {
	const [pickedImage, setPickedImage] = useState(null);
	const imageInput = useRef();
	const handlePickClick = () => {
		console.log('Hello');
		imageInput.current.click();
	};

	const handleImageChange = (event) => {
		const file = event.target.files[0];

		if (!file) {
			setPickedImage(null);
			return;
		}

		const fileReader = new FileReader();

		fileReader.onload = () => {
			setPickedImage(fileReader.result);
			// URL.revokeObjectURL(fileReader.result);
		};

		fileReader.readAsDataURL(file);
	};
	return (
		<div className={classes.picker}>
			<label htmlFor={name}>{label}</label>
			<div className={classes.controls}>
				<div className={classes.preview}>
					{!pickedImage && <p>No image chosen yet!</p>}
					{pickedImage && <Image src={pickedImage} alt='Preview' fill />}
				</div>
				<input
					className={classes.input}
					type='file'
					id={name}
					name={name}
					accept='image/png, image/jpeg'
					onChange={handleImageChange}
					ref={imageInput}
				/>
				<button className={classes.button} type='button' onClick={handlePickClick}>
					Choose Image
				</button>
			</div>
		</div>
	);
};

export default ImagePicker;
