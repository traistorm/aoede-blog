import Link from "next/link";
import Label from "./label";

export default function CategoryLabel({
  categories,
  nomargin = false
}) {
  return (
    <div className="flex gap-3">
      {categories?.length &&
        categories.slice(0).map((category, index) => (
          <Link
            href={`/category/`}
            key={index}>
            <Label nomargin={nomargin} color={category.color}>
              {category.title}
            </Label>
          </Link>
        ))}
    </div>
  );
}
