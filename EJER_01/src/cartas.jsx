import { useState } from 'react'

const SAMPLE_IMG = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPnvP17Pnvbh9ZCjY5uGbpbvebZJcC2H24Cw&s";


function Cards() {
    const cards = new Array(4).fill(0).map((_, i) => ({
        title: "Explora la Naturaleza",
        text: "Descubre cómo cuidar el medio ambiente y conectar con la vida natural.",
        img: SAMPLE_IMG,
    }));

    return (
        <>
            <div className="container py-5">
                <div className="row g-4">
                    {cards.map((c, i) => (
                        <div key={i} className="col-12 col-sm-6 col-md-3">
                            <div className="card h-100 shadow">
                                <img src={c.img} alt={c.title} className="card-img-top" style={{height: 180, objectFit: 'cover'}} />
                                <div className="card-body">
                                    <h5 className="card-title text-success fw-bold">{c.title}</h5>
                                    <p className="card-text">{c.text}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Cards;