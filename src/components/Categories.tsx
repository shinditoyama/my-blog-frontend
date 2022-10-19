import Link from "next/link";
import { useRouter } from "next/router";
import { ICategory } from "../types";

interface Props {
  data: ICategory;
}

export default function Categories({ data }: Props) {
  const { query } = useRouter();

  return (
    <Link href={`/category/${data.attributes.slug}`}>
      <span className="cursor-pointer capitalize block border-b pb-3 mb-3">
        <p
          className={`${
            query.slug === data.attributes.name && "font-bold translate-x-4"
          } hover:translate-x-4`}
        >
          {data.attributes.name}
        </p>
      </span>
    </Link>
  );
}
