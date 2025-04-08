'use client'
import React from 'react'
import classes from './image-picker.module.css'

const ImagePicker = ({label, name}) => {
  const handlePickClick = () => {
    console.log("Hello")
  }
  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <input className={classes.input} type='file' id={name} name={name} accept='image/png, image/jpeg' />
        <button className={classes.button} type='button' onClick={handlePickClick}>Choose Image</button>
      </div>
    </div>
  )
}

export default ImagePicker