/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as IndexImport } from './routes/index'
import { Route as NovedadesIndexImport } from './routes/novedades/index'
import { Route as AquariumIndexImport } from './routes/aquarium/index'
import { Route as AboutIndexImport } from './routes/about/index'
import { Route as ExpertoIntroExpertoImport } from './routes/experto/introExperto'
import { Route as CommunityIntroCommunityImport } from './routes/community/introCommunity'
import { Route as ArticlesIntroArticlesImport } from './routes/articles/introArticles'
import { Route as ExpertoPostIndexImport } from './routes/experto/post/index'
import { Route as CommunityForumIndexImport } from './routes/community/forum/index'
import { Route as AuthRegisterIndexImport } from './routes/auth/register/index'
import { Route as AuthLoginIndexImport } from './routes/auth/login/index'
import { Route as ArticlesCategoryIndexImport } from './routes/articles/category/index'
import { Route as AquariumLetterIndexImport } from './routes/aquarium/letter/index'
import { Route as ExpertoPostNewImport } from './routes/experto/post/new'
import { Route as CommunityForumNewImport } from './routes/community/forum/new'
import { Route as ExpertoPostPostidIndexImport } from './routes/experto/post/$postid/index'
import { Route as CommunityForumForumidIndexImport } from './routes/community/forum/$forumid/index'
import { Route as ArticlesCategoryCategoryidIndexImport } from './routes/articles/category/$categoryid/index'
import { Route as AquariumLetterLetteridIndexImport } from './routes/aquarium/letter/$letterid/index'

// Create/Update Routes

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const NovedadesIndexRoute = NovedadesIndexImport.update({
  id: '/novedades/',
  path: '/novedades/',
  getParentRoute: () => rootRoute,
} as any)

const AquariumIndexRoute = AquariumIndexImport.update({
  id: '/aquarium/',
  path: '/aquarium/',
  getParentRoute: () => rootRoute,
} as any)

const AboutIndexRoute = AboutIndexImport.update({
  id: '/about/',
  path: '/about/',
  getParentRoute: () => rootRoute,
} as any)

const ExpertoIntroExpertoRoute = ExpertoIntroExpertoImport.update({
  id: '/experto/introExperto',
  path: '/experto/introExperto',
  getParentRoute: () => rootRoute,
} as any)

const CommunityIntroCommunityRoute = CommunityIntroCommunityImport.update({
  id: '/community/introCommunity',
  path: '/community/introCommunity',
  getParentRoute: () => rootRoute,
} as any)

const ArticlesIntroArticlesRoute = ArticlesIntroArticlesImport.update({
  id: '/articles/introArticles',
  path: '/articles/introArticles',
  getParentRoute: () => rootRoute,
} as any)

const ExpertoPostIndexRoute = ExpertoPostIndexImport.update({
  id: '/experto/post/',
  path: '/experto/post/',
  getParentRoute: () => rootRoute,
} as any)

const CommunityForumIndexRoute = CommunityForumIndexImport.update({
  id: '/community/forum/',
  path: '/community/forum/',
  getParentRoute: () => rootRoute,
} as any)

const AuthRegisterIndexRoute = AuthRegisterIndexImport.update({
  id: '/auth/register/',
  path: '/auth/register/',
  getParentRoute: () => rootRoute,
} as any)

const AuthLoginIndexRoute = AuthLoginIndexImport.update({
  id: '/auth/login/',
  path: '/auth/login/',
  getParentRoute: () => rootRoute,
} as any)

const ArticlesCategoryIndexRoute = ArticlesCategoryIndexImport.update({
  id: '/articles/category/',
  path: '/articles/category/',
  getParentRoute: () => rootRoute,
} as any)

const AquariumLetterIndexRoute = AquariumLetterIndexImport.update({
  id: '/aquarium/letter/',
  path: '/aquarium/letter/',
  getParentRoute: () => rootRoute,
} as any)

const ExpertoPostNewRoute = ExpertoPostNewImport.update({
  id: '/experto/post/new',
  path: '/experto/post/new',
  getParentRoute: () => rootRoute,
} as any)

const CommunityForumNewRoute = CommunityForumNewImport.update({
  id: '/community/forum/new',
  path: '/community/forum/new',
  getParentRoute: () => rootRoute,
} as any)

const ExpertoPostPostidIndexRoute = ExpertoPostPostidIndexImport.update({
  id: '/experto/post/$postid/',
  path: '/experto/post/$postid/',
  getParentRoute: () => rootRoute,
} as any)

const CommunityForumForumidIndexRoute = CommunityForumForumidIndexImport.update(
  {
    id: '/community/forum/$forumid/',
    path: '/community/forum/$forumid/',
    getParentRoute: () => rootRoute,
  } as any,
)

const ArticlesCategoryCategoryidIndexRoute =
  ArticlesCategoryCategoryidIndexImport.update({
    id: '/articles/category/$categoryid/',
    path: '/articles/category/$categoryid/',
    getParentRoute: () => rootRoute,
  } as any)

const AquariumLetterLetteridIndexRoute =
  AquariumLetterLetteridIndexImport.update({
    id: '/aquarium/letter/$letterid/',
    path: '/aquarium/letter/$letterid/',
    getParentRoute: () => rootRoute,
  } as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/articles/introArticles': {
      id: '/articles/introArticles'
      path: '/articles/introArticles'
      fullPath: '/articles/introArticles'
      preLoaderRoute: typeof ArticlesIntroArticlesImport
      parentRoute: typeof rootRoute
    }
    '/community/introCommunity': {
      id: '/community/introCommunity'
      path: '/community/introCommunity'
      fullPath: '/community/introCommunity'
      preLoaderRoute: typeof CommunityIntroCommunityImport
      parentRoute: typeof rootRoute
    }
    '/experto/introExperto': {
      id: '/experto/introExperto'
      path: '/experto/introExperto'
      fullPath: '/experto/introExperto'
      preLoaderRoute: typeof ExpertoIntroExpertoImport
      parentRoute: typeof rootRoute
    }
    '/about/': {
      id: '/about/'
      path: '/about'
      fullPath: '/about'
      preLoaderRoute: typeof AboutIndexImport
      parentRoute: typeof rootRoute
    }
    '/aquarium/': {
      id: '/aquarium/'
      path: '/aquarium'
      fullPath: '/aquarium'
      preLoaderRoute: typeof AquariumIndexImport
      parentRoute: typeof rootRoute
    }
    '/novedades/': {
      id: '/novedades/'
      path: '/novedades'
      fullPath: '/novedades'
      preLoaderRoute: typeof NovedadesIndexImport
      parentRoute: typeof rootRoute
    }
    '/community/forum/new': {
      id: '/community/forum/new'
      path: '/community/forum/new'
      fullPath: '/community/forum/new'
      preLoaderRoute: typeof CommunityForumNewImport
      parentRoute: typeof rootRoute
    }
    '/experto/post/new': {
      id: '/experto/post/new'
      path: '/experto/post/new'
      fullPath: '/experto/post/new'
      preLoaderRoute: typeof ExpertoPostNewImport
      parentRoute: typeof rootRoute
    }
    '/aquarium/letter/': {
      id: '/aquarium/letter/'
      path: '/aquarium/letter'
      fullPath: '/aquarium/letter'
      preLoaderRoute: typeof AquariumLetterIndexImport
      parentRoute: typeof rootRoute
    }
    '/articles/category/': {
      id: '/articles/category/'
      path: '/articles/category'
      fullPath: '/articles/category'
      preLoaderRoute: typeof ArticlesCategoryIndexImport
      parentRoute: typeof rootRoute
    }
    '/auth/login/': {
      id: '/auth/login/'
      path: '/auth/login'
      fullPath: '/auth/login'
      preLoaderRoute: typeof AuthLoginIndexImport
      parentRoute: typeof rootRoute
    }
    '/auth/register/': {
      id: '/auth/register/'
      path: '/auth/register'
      fullPath: '/auth/register'
      preLoaderRoute: typeof AuthRegisterIndexImport
      parentRoute: typeof rootRoute
    }
    '/community/forum/': {
      id: '/community/forum/'
      path: '/community/forum'
      fullPath: '/community/forum'
      preLoaderRoute: typeof CommunityForumIndexImport
      parentRoute: typeof rootRoute
    }
    '/experto/post/': {
      id: '/experto/post/'
      path: '/experto/post'
      fullPath: '/experto/post'
      preLoaderRoute: typeof ExpertoPostIndexImport
      parentRoute: typeof rootRoute
    }
    '/aquarium/letter/$letterid/': {
      id: '/aquarium/letter/$letterid/'
      path: '/aquarium/letter/$letterid'
      fullPath: '/aquarium/letter/$letterid'
      preLoaderRoute: typeof AquariumLetterLetteridIndexImport
      parentRoute: typeof rootRoute
    }
    '/articles/category/$categoryid/': {
      id: '/articles/category/$categoryid/'
      path: '/articles/category/$categoryid'
      fullPath: '/articles/category/$categoryid'
      preLoaderRoute: typeof ArticlesCategoryCategoryidIndexImport
      parentRoute: typeof rootRoute
    }
    '/community/forum/$forumid/': {
      id: '/community/forum/$forumid/'
      path: '/community/forum/$forumid'
      fullPath: '/community/forum/$forumid'
      preLoaderRoute: typeof CommunityForumForumidIndexImport
      parentRoute: typeof rootRoute
    }
    '/experto/post/$postid/': {
      id: '/experto/post/$postid/'
      path: '/experto/post/$postid'
      fullPath: '/experto/post/$postid'
      preLoaderRoute: typeof ExpertoPostPostidIndexImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/articles/introArticles': typeof ArticlesIntroArticlesRoute
  '/community/introCommunity': typeof CommunityIntroCommunityRoute
  '/experto/introExperto': typeof ExpertoIntroExpertoRoute
  '/about': typeof AboutIndexRoute
  '/aquarium': typeof AquariumIndexRoute
  '/novedades': typeof NovedadesIndexRoute
  '/community/forum/new': typeof CommunityForumNewRoute
  '/experto/post/new': typeof ExpertoPostNewRoute
  '/aquarium/letter': typeof AquariumLetterIndexRoute
  '/articles/category': typeof ArticlesCategoryIndexRoute
  '/auth/login': typeof AuthLoginIndexRoute
  '/auth/register': typeof AuthRegisterIndexRoute
  '/community/forum': typeof CommunityForumIndexRoute
  '/experto/post': typeof ExpertoPostIndexRoute
  '/aquarium/letter/$letterid': typeof AquariumLetterLetteridIndexRoute
  '/articles/category/$categoryid': typeof ArticlesCategoryCategoryidIndexRoute
  '/community/forum/$forumid': typeof CommunityForumForumidIndexRoute
  '/experto/post/$postid': typeof ExpertoPostPostidIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/articles/introArticles': typeof ArticlesIntroArticlesRoute
  '/community/introCommunity': typeof CommunityIntroCommunityRoute
  '/experto/introExperto': typeof ExpertoIntroExpertoRoute
  '/about': typeof AboutIndexRoute
  '/aquarium': typeof AquariumIndexRoute
  '/novedades': typeof NovedadesIndexRoute
  '/community/forum/new': typeof CommunityForumNewRoute
  '/experto/post/new': typeof ExpertoPostNewRoute
  '/aquarium/letter': typeof AquariumLetterIndexRoute
  '/articles/category': typeof ArticlesCategoryIndexRoute
  '/auth/login': typeof AuthLoginIndexRoute
  '/auth/register': typeof AuthRegisterIndexRoute
  '/community/forum': typeof CommunityForumIndexRoute
  '/experto/post': typeof ExpertoPostIndexRoute
  '/aquarium/letter/$letterid': typeof AquariumLetterLetteridIndexRoute
  '/articles/category/$categoryid': typeof ArticlesCategoryCategoryidIndexRoute
  '/community/forum/$forumid': typeof CommunityForumForumidIndexRoute
  '/experto/post/$postid': typeof ExpertoPostPostidIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/articles/introArticles': typeof ArticlesIntroArticlesRoute
  '/community/introCommunity': typeof CommunityIntroCommunityRoute
  '/experto/introExperto': typeof ExpertoIntroExpertoRoute
  '/about/': typeof AboutIndexRoute
  '/aquarium/': typeof AquariumIndexRoute
  '/novedades/': typeof NovedadesIndexRoute
  '/community/forum/new': typeof CommunityForumNewRoute
  '/experto/post/new': typeof ExpertoPostNewRoute
  '/aquarium/letter/': typeof AquariumLetterIndexRoute
  '/articles/category/': typeof ArticlesCategoryIndexRoute
  '/auth/login/': typeof AuthLoginIndexRoute
  '/auth/register/': typeof AuthRegisterIndexRoute
  '/community/forum/': typeof CommunityForumIndexRoute
  '/experto/post/': typeof ExpertoPostIndexRoute
  '/aquarium/letter/$letterid/': typeof AquariumLetterLetteridIndexRoute
  '/articles/category/$categoryid/': typeof ArticlesCategoryCategoryidIndexRoute
  '/community/forum/$forumid/': typeof CommunityForumForumidIndexRoute
  '/experto/post/$postid/': typeof ExpertoPostPostidIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/articles/introArticles'
    | '/community/introCommunity'
    | '/experto/introExperto'
    | '/about'
    | '/aquarium'
    | '/novedades'
    | '/community/forum/new'
    | '/experto/post/new'
    | '/aquarium/letter'
    | '/articles/category'
    | '/auth/login'
    | '/auth/register'
    | '/community/forum'
    | '/experto/post'
    | '/aquarium/letter/$letterid'
    | '/articles/category/$categoryid'
    | '/community/forum/$forumid'
    | '/experto/post/$postid'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/articles/introArticles'
    | '/community/introCommunity'
    | '/experto/introExperto'
    | '/about'
    | '/aquarium'
    | '/novedades'
    | '/community/forum/new'
    | '/experto/post/new'
    | '/aquarium/letter'
    | '/articles/category'
    | '/auth/login'
    | '/auth/register'
    | '/community/forum'
    | '/experto/post'
    | '/aquarium/letter/$letterid'
    | '/articles/category/$categoryid'
    | '/community/forum/$forumid'
    | '/experto/post/$postid'
  id:
    | '__root__'
    | '/'
    | '/articles/introArticles'
    | '/community/introCommunity'
    | '/experto/introExperto'
    | '/about/'
    | '/aquarium/'
    | '/novedades/'
    | '/community/forum/new'
    | '/experto/post/new'
    | '/aquarium/letter/'
    | '/articles/category/'
    | '/auth/login/'
    | '/auth/register/'
    | '/community/forum/'
    | '/experto/post/'
    | '/aquarium/letter/$letterid/'
    | '/articles/category/$categoryid/'
    | '/community/forum/$forumid/'
    | '/experto/post/$postid/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  ArticlesIntroArticlesRoute: typeof ArticlesIntroArticlesRoute
  CommunityIntroCommunityRoute: typeof CommunityIntroCommunityRoute
  ExpertoIntroExpertoRoute: typeof ExpertoIntroExpertoRoute
  AboutIndexRoute: typeof AboutIndexRoute
  AquariumIndexRoute: typeof AquariumIndexRoute
  NovedadesIndexRoute: typeof NovedadesIndexRoute
  CommunityForumNewRoute: typeof CommunityForumNewRoute
  ExpertoPostNewRoute: typeof ExpertoPostNewRoute
  AquariumLetterIndexRoute: typeof AquariumLetterIndexRoute
  ArticlesCategoryIndexRoute: typeof ArticlesCategoryIndexRoute
  AuthLoginIndexRoute: typeof AuthLoginIndexRoute
  AuthRegisterIndexRoute: typeof AuthRegisterIndexRoute
  CommunityForumIndexRoute: typeof CommunityForumIndexRoute
  ExpertoPostIndexRoute: typeof ExpertoPostIndexRoute
  AquariumLetterLetteridIndexRoute: typeof AquariumLetterLetteridIndexRoute
  ArticlesCategoryCategoryidIndexRoute: typeof ArticlesCategoryCategoryidIndexRoute
  CommunityForumForumidIndexRoute: typeof CommunityForumForumidIndexRoute
  ExpertoPostPostidIndexRoute: typeof ExpertoPostPostidIndexRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  ArticlesIntroArticlesRoute: ArticlesIntroArticlesRoute,
  CommunityIntroCommunityRoute: CommunityIntroCommunityRoute,
  ExpertoIntroExpertoRoute: ExpertoIntroExpertoRoute,
  AboutIndexRoute: AboutIndexRoute,
  AquariumIndexRoute: AquariumIndexRoute,
  NovedadesIndexRoute: NovedadesIndexRoute,
  CommunityForumNewRoute: CommunityForumNewRoute,
  ExpertoPostNewRoute: ExpertoPostNewRoute,
  AquariumLetterIndexRoute: AquariumLetterIndexRoute,
  ArticlesCategoryIndexRoute: ArticlesCategoryIndexRoute,
  AuthLoginIndexRoute: AuthLoginIndexRoute,
  AuthRegisterIndexRoute: AuthRegisterIndexRoute,
  CommunityForumIndexRoute: CommunityForumIndexRoute,
  ExpertoPostIndexRoute: ExpertoPostIndexRoute,
  AquariumLetterLetteridIndexRoute: AquariumLetterLetteridIndexRoute,
  ArticlesCategoryCategoryidIndexRoute: ArticlesCategoryCategoryidIndexRoute,
  CommunityForumForumidIndexRoute: CommunityForumForumidIndexRoute,
  ExpertoPostPostidIndexRoute: ExpertoPostPostidIndexRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/articles/introArticles",
        "/community/introCommunity",
        "/experto/introExperto",
        "/about/",
        "/aquarium/",
        "/novedades/",
        "/community/forum/new",
        "/experto/post/new",
        "/aquarium/letter/",
        "/articles/category/",
        "/auth/login/",
        "/auth/register/",
        "/community/forum/",
        "/experto/post/",
        "/aquarium/letter/$letterid/",
        "/articles/category/$categoryid/",
        "/community/forum/$forumid/",
        "/experto/post/$postid/"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/articles/introArticles": {
      "filePath": "articles/introArticles.tsx"
    },
    "/community/introCommunity": {
      "filePath": "community/introCommunity.tsx"
    },
    "/experto/introExperto": {
      "filePath": "experto/introExperto.tsx"
    },
    "/about/": {
      "filePath": "about/index.tsx"
    },
    "/aquarium/": {
      "filePath": "aquarium/index.tsx"
    },
    "/novedades/": {
      "filePath": "novedades/index.tsx"
    },
    "/community/forum/new": {
      "filePath": "community/forum/new.tsx"
    },
    "/experto/post/new": {
      "filePath": "experto/post/new.tsx"
    },
    "/aquarium/letter/": {
      "filePath": "aquarium/letter/index.tsx"
    },
    "/articles/category/": {
      "filePath": "articles/category/index.tsx"
    },
    "/auth/login/": {
      "filePath": "auth/login/index.tsx"
    },
    "/auth/register/": {
      "filePath": "auth/register/index.tsx"
    },
    "/community/forum/": {
      "filePath": "community/forum/index.tsx"
    },
    "/experto/post/": {
      "filePath": "experto/post/index.tsx"
    },
    "/aquarium/letter/$letterid/": {
      "filePath": "aquarium/letter/$letterid/index.tsx"
    },
    "/articles/category/$categoryid/": {
      "filePath": "articles/category/$categoryid/index.tsx"
    },
    "/community/forum/$forumid/": {
      "filePath": "community/forum/$forumid/index.tsx"
    },
    "/experto/post/$postid/": {
      "filePath": "experto/post/$postid/index.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
