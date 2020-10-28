import React, { useEffect, useState } from 'react';
import './Slider.css';

const Slider = ({ slides }) => {
    const [curr, setCurr] = useState(0);
    const { length } = slides;

    const goToNext = () => {
        //check if we're reached the final slide in the array, else go back to 0
        setCurr(curr === length - 1 ? 0 : curr + 1);
    }

    useEffect(() => {
        setTimeout(goToNext, 5000);

        return function () {
            clearTimeout(goToNext)
        }
    })


    return (
        <div className="slider-container">
            {slides.map((s, i) => (
                <div
                    // if active slide, include the "active" class
                    className={i === curr ? "slide active" : "slide"}
                    key={i}
                    // if not active, hide from screen readers for accessibility
                    aria-hidden={i !== curr}
                >

                    {i === curr && (
                        <img className="image" src={s.image} alt="home-slides" />
                    )}
                </div>
            ))}

        </div>

    )
}

export default Slider;