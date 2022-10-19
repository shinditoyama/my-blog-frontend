import moment from "moment";
import Link from "next/link";
import { IArticle } from "../types";

interface Props {
  data: IArticle;
}

export default function Articles({ data }: Props) {
  return (
    <Link href={`/article/${data.attributes.slug}`}>
      <article className="bg-white dark:bg-gray-700 border rounded shadow-lg p-6 cursor-pointer mb-6 group hover:border-blue-600">
        <h2 className="text-3xl font-bold">{data.attributes.title}</h2>
        <p className="capitalize font-semibold text-gray-400">
          {data.attributes.category.data.attributes.name}
        </p>
        <div className="py-4">
          <p className="truncate">{data.attributes.description}</p>
        </div>
        <div className="flex justify-between">
          <div className="text-gray-400">
            {moment(data.attributes.publishedAt).format("LLL")}
          </div>
          <div className="group-hover:text-blue-500 group-hover:font-bold">
            - Read More -
          </div>
        </div>
      </article>
    </Link>
  );
}
