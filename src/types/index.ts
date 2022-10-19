export interface IArticle {
  id: number;
  attributes: IArticlesAttribute;
}

export interface ICategory {
  id: number;
  attributes: ICategoriesAttribute;
}

export interface IArticlesAttribute {
  title: string;
  slug: string;
  description: string;
  publishedAt: string;
  cover: {
    data: {
      attributes: {
        formats: any;
      };
    };
  };
  author: {
    data: {
      attributes: {
        name: string;
        avatar: {
          data: {
            attributes: {
              formats: any;
            };
          };
        };
      };
    };
  };
  category: {
    data: {
      attributes: {
        name: string;
        slug: string;
      };
    };
  };
}

export interface ICategoriesAttribute {
  name: string;
  slug: string;
}
