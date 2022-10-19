import { GetStaticProps } from "next";
import Articles from "../components/Articles";
import Categories from "../components/Categories";
import { client } from "../lib/apollo-client";
import { GET_ALL_ARTICLES } from "../lib/queries/article";
import { GET_ALL_CATEGORIES } from "../lib/queries/categories";
import { IArticle, ICategory } from "../types";

interface Props {
  articles: IArticle[];
  categories: ICategory[];
}

export default function Home({ articles, categories }: Props) {
  return (
    <div className="py-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 col-span-1">
          {articles.map((article, index) => (
            <Articles key={index} data={article} />
          ))}
        </div>
        <div className="lg:col-span-4 col-span-1">
          <div className="lg:sticky relative top-8">
            <div className="bg-white dark:bg-gray-700 shadow-lg rounded-lg p-8 pb-12 mb-8">
              <h3 className="text-xl mb-8 font-semibold">Categorias</h3>
              {categories.map((category, index) => (
                <Categories key={index} data={category} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { data: article } = await client.query({
    query: GET_ALL_ARTICLES,
  });

  const { data: category } = await client.query({
    query: GET_ALL_CATEGORIES,
  });

  return {
    props: {
      articles: article.articles.data,
      categories: category.categories.data,
    },
    revalidate: 1,
  };
};
