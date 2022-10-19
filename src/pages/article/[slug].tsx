import moment from "moment";
import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import SEO from "../../components/SEO";
import { client, getStrapiMedia } from "../../lib/apollo-client";
import { GET_ARTICLE, GET_ARTICLE_SLUG } from "../../lib/queries/article";
import { IArticle } from "../../types";

interface Props {
  article: IArticle;
}

export default function Article({ article }: Props) {
  return (
    <>
      <SEO
        title={article.attributes.title}
        description={article.attributes.description}
      />
      <div className="py-6">
        <div className="mb-4">
          <h1 className="text-3xl font-bold">{article.attributes.title}</h1>
          <div className="flex justify-between">
            <div>
              Writter by - {article.attributes.author.data.attributes.name}
            </div>
            <div>{moment(article.attributes.publishedAt).format("LLLL")}</div>
          </div>
        </div>
        {article.attributes.cover.data.attributes.formats.large ? (
          <Image
            src={getStrapiMedia(
              article.attributes.cover.data.attributes.formats.large.url
            )}
            width={article.attributes.cover.data.attributes.formats.large.width}
            height={
              article.attributes.cover.data.attributes.formats.large.height
            }
            alt={article.attributes.cover.data.attributes.formats.large.name}
            layout="responsive"
            priority
          />
        ) : (
          <Image
            src={getStrapiMedia(
              article.attributes.cover.data.attributes.formats.medium.url
            )}
            width={
              article.attributes.cover.data.attributes.formats.medium.width
            }
            height={
              article.attributes.cover.data.attributes.formats.medium.height
            }
            alt={article.attributes.cover.data.attributes.formats.medium.name}
            layout="responsive"
            priority
          />
        )}
      </div>
      <div>{}</div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await client.query({
    query: GET_ARTICLE_SLUG,
  });

  const paths = data?.articles?.data.map((post: any) => ({
    params: {
      slug: post.attributes.slug,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }: any) => {
  const { slug } = params;
  const { data } = await client.query({
    query: GET_ARTICLE,
    variables: { slug },
  });

  return {
    props: {
      article: data.articles.data[0],
    },
  };
};
