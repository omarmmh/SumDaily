import React from "react";
import { logo } from "../assets";


const Front = () => {
  return (
    <header className='w-full flex justify-center items-center flex-col'>
      <nav className='flex justify-between items-center w-full mb-10 pt-3'>
        <img src={logo} alt='sumz_logo' className='w-28 object-contain' />

        <button
          type='button'
            onClick={() =>
              window.open("https://omarmahfud.com", "_blank")
            }
            className='black_btn'
          >
          <b>Text Summarizer</b>
        </button>

        <button
          type='button'
          onClick={() =>
            window.open("https://omarmahfud.com", "_blank")
          }
          className='black_btn1'
        >
          <b>Portfolio Website</b>
        </button>
      </nav>

      <h1 className='head_text'>
        Articles Summarized by SumDaily <br className='max-md:hidden' />
        <span style={{ color: '#FF2400' }}>Read Less, Grasp More!</span>
      </h1>
      <h2 className='desc'>
      Unlock more time with SumDaily! Dive directly into what matters, and leave the long reads behind. 
      Get the gist, skip the rest.
      </h2>
    </header>
  );
};

export default Front;
