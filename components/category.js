import Link from "next/link";
import Label from "./label";
import {useEffect, useState} from "react";

export default function CategoryLabel({categories, nomargin = false}) {
  const [categoriesShow, setCategoriesShow] = useState([]);
  useEffect(() => {
    if (categories) {
      setCategoriesShow(JSON.parse(categories));
    }
  }, []);
  return (
    <div className="flex gap-3">
      {categoriesShow?.length &&
          categoriesShow.slice(0).map((category, index) => (
          <Link
            href={`/category/`}
            key={index}>
            <Label nomargin={nomargin} color={category.color}>
              {category.name}
            </Label>
          </Link>
        ))}
    </div>
  );
}
