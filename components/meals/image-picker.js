'use client'
import React from 'react'
import classes from './image-picker.module.css'
import { useRef } from'react';

const ImagePicker = ({label, name}) => {
  const imageInput = useRef();
  const handlePickClick = () => {
    console.log("Hello");
    imageInput.current.click();
  }
  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <input className={classes.input} type='file' id={name} name={name} accept='image/png, image/jpeg' ref={imageInput}/>
        <button className={classes.button} type='button' onClick={handlePickClick}>Choose Image</button>
      </div>
    </div>
  )
}

export default ImagePicker