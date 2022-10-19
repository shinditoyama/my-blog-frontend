import { GetStaticPaths, GetStaticProps } from "next";
import Articles from "../../components/Articles";
import Categories from "../../components/Categories";
import { client } from "../../lib/apollo-client";
import { GET_ARTICLE_BY_CATEGORY } from "../../lib/queries/article";
import {
  GET_ALL_CATEGORIES,
  GET_CATEGORY_SLUG,
} from "../../lib/queries/categories";
import { IArticle, ICategory } from "../../types";

interface Props {
  articles: IArticle[];
  categories: ICategory[];
}

export default function Category({ articles, categories }: Props) {
  return (
    <div className="py-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 col-span-1">
          {articles.map((article, index) => (
            <Articles key={index} data={article} />
          ))}
          {articles.length == 0 && "Post não encontrado!"}
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

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await client.query({
    query: GET_CATEGORY_SLUG,
  });

  const paths = data?.categories?.data.map((cat: any) => ({
    params: {
      slug: cat.attributes.slug,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }: any) => {
  const { slug } = params;
  const { data: article } = await client.query({
    query: GET_ARTICLE_BY_CATEGORY,
    variables: { slug },
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
