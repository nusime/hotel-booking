import React from 'react'

const Title = ({title, subTitle, align, font}) => {
  console.log("Subtitle:" ,subTitle)

  return (
    <div className={`flex flex-col justify-center ${align === 'left' ? 'items-start text-left' 
    : 'items-center text-center'}`}>

        <h1 className={`text-4xl md:text-[40px] ${font || 'font-playfair'}`}>{title}</h1>
        {subTitle && (
          <p className='text-sm md:text-base text-gray-500 mt-4 max-w-xl'>{subTitle}</p>
        )}
    </div>
  )
}
export default Title;