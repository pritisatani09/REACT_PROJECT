import React from "react";
import "./CategorySection.css";

import img1 from "../assets/img1.png";
import img2 from "../assets/img2.png";
import img3 from "../assets/img3.png";
import img4 from "../assets/img4.png";
import img5 from "../assets/img5.png";
import img6 from "../assets/img6.png";
import img7 from "../assets/img7.png";
import img8 from "../assets/img8.png";
import img9 from "../assets/img9.png";
import img10 from "../assets/img10.png";
import img11 from "../assets/img11.png";
import img12 from "../assets/img12.png";
import img13 from "../assets/img13.png";
import img14 from "../assets/img14.png";
import img15 from "../assets/img15.png";
import img16 from "../assets/img16.png";
import img17 from "../assets/img17.png";
import img18 from "../assets/img18.png";
import img19 from "../assets/img19.png";
import img20 from "../assets/img20.png";

const categories = [
  { img: img1, },
  { img: img2, },
  { img: img3, },
  { img: img4, },
  { img: img5, },
  { img: img6, },
  { img: img7, },
  { img: img8, },
  { img: img9, },
  { img: img10, },
  { img: img11, },
  { img: img12, },
  { img: img13, },
  { img: img14, },
  { img: img15, },
  { img: img16, },
  { img: img17, },
  { img: img18, },
  { img: img19, },
  { img: img20, },
];

const CategorySection = () => {
  return (
    <div className="category-section">
      <div className="category-grid">
        {categories.map((item, index) => (
          <div className="category-box" key={index}>
            <img src={item.img} alt={item.label} />
            <p>{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySection;
