import React from 'react'

export default function Rating({rate}) {
    const stars = [];
    for (let i = 0; i < 5; i++) {
        if (i < rate) {
            stars.push( "fa-solid fa-star fa-xs star-active");
        }
        else {
            stars.push("fa-solid fa-star fa-xs star-not-active");
        }
    }

    return (
        <>
        {stars.map((star,index) =>
            <i className={star} key={index} ></i>
        )}
        </>
    )
}
