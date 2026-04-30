---
theme: apple-basic
title: REST In Peace - Why GraphQL?
drawings:
  persist: false
transition: slide-left
comark: true
duration: 20min
layout: custom-image-right
image: '/profile.webp'
---

# REST In Peace
## Por qué y cómo con GraphQL

<div class="absolute bottom-10">

  ## Mario Ferrero
  ### Ingeniero Full Stack

  <div class="flex items-center gap-6 text-sm">
    <span class="font-700">
      @mariofdezzz
    </span>
    <div class="flex items-center">
      <a href="https://github.com/mariofdezzz" target="_blank" class="slidev-icon-btn">
        <carbon:logo-github />
      </a>
      <a href="https://substack.com/@mariofdezzz" target="_blank" class="slidev-icon-btn">
        <mingcute:substack-fill />
      </a>
      <a href="https://www.linkedin.com/in/mario-ferrero" target="_blank" class="slidev-icon-btn">
        <carbon:logo-linkedin />
      </a>
      <a href="https://mariofdezzz.dev" target="_blank" class="slidev-icon-btn">
        <clarity:world-line />
      </a>
    </div>
  </div>
</div>

<!-- 
Cuantos conocen GraphQL?
Cuantos lo han probado?
Cuantos lo han usado profesionalmente?
-->

---
layout: image
image: /homer-bush.gif
backgroundSize: 15em
---

<!-- 
Cuales son los contras de REST?
-->

---

# Exceso de información

```
GET /posts
```

```json {all|9,15,17,18}
[
  {
    "title": "Mi primer premio Nobel",
    "content": "Acabo de ganar mi primer premio...",
    "likes": 21312,
    "views": 1231231,
    "comments": 456,
    "reposts": 234,
    "isPinned": true,
    "isEdited": false,
    "author": {
      "name": "Donald Trump",
      "username": "@donaldtrump",
      "followers": 1231232,
      "following": 543,
      "profile-pic": "https://example.com/profile.jpg",
      "premium": true,
      "followersSince": "2009-05-04"
    }
  },
  ...
]
```

---

# Falta de información

```
GET /posts
```

```json {all|11}
[
  {
    "title": "Mi primer premio Nobel",
    "content": "Acabo de ganar mi primer premio...",
    "likes": 21312,
    "views": 1231231,
    "comments": 456,
    "reposts": 234,
    "isPinned": true,
    "isEdited": false,
    "authorId": 13821791293192
  },
  ...
]
```

<v-click>
```
GET /users/13821791293192
```
</v-click>

---

# Relaciones entre entidades

```
GET /posts
```

````md magic-move {lines: true}
```json {11-19}
[
  {
    "title": "Mi primer premio Nobel",
    "content": "Acabo de ganar mi primer premio...",
    "likes": 21312,
    "views": 1231231,
    "comments": 456,
    "reposts": 234,
    "isPinned": true,
    "isEdited": false,
    "author": {
      "name": "Donald Trump",
      "username": "@donaldtrump",
      "followers": 1231232,
      "following": 543,
      "profile-pic": "https://example.com/profile.jpg",
      "premium": true,
      "followersSince": "2009-05-04"
    }
  },
  ...
]
```

```json {11}
[
  {
    "title": "Mi primer premio Nobel",
    "content": "Acabo de ganar mi primer premio...",
    "likes": 21312,
    "views": 1231231,
    "comments": 456,
    "reposts": 234,
    "isPinned": true,
    "isEdited": false,
    "authorId": 13821791293192
  },
  ...
]
```

```json {11-17}
[
  {
    "title": "Mi primer premio Nobel",
    "content": "Acabo de ganar mi primer premio...",
    "likes": 21312,
    "views": 1231231,
    "comments": 456,
    "reposts": 234,
    "isPinned": true,
    "isEdited": false,
    "links": [ // HATEOAS (Hypermedia as the Engine of Application State)
      {
        "href": "/users/13821791293192",
        "type": "GET",
        "rel": "author"
      }
    ],
  },
  ...
]
```
````

---
layout: center
---

## Backend for Frontend
## Versionado
## Batching
## Cache

---
layout: center
---

# Soluciona algo GraphQL?

---
layout: center
---

<iframe width="300" height="500" src="https://www.youtube.com/embed/hpv3nYTaowU" title="Top War Ads Review New Level 402 Update: Battle Game #games #gameplay #gaming" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>


---
layout: center
---

# Soluciona algo GraphQL?

---
layout: image
image: /graphql-diagram.png
backgroundSize: 70%
---

---
layout: image
image: /ddd-book.png
backgroundSize: 15em
---

<!--
DDD es un enfoque de diseño de software que se centra en modelar código de forma que represente el dominio del negocio
-->

---

# Conceptos Fundamentales
## Entidades

````md magic-move
```gql
type Post {
  title: String!
  content: String!
  likes: Int!
  isPinned: Boolean
}
```

```gql
type Post {
  title: String!
  content: String!
  likes: Int!
  isPinned: Boolean
  author: Author!
}

type Author {
  name: String!
  username: String!
  followers: Int!
}
```
````

---
layout: three-cols-header
transition: view-transition
layoutClass: gap-4
---

# Conceptos Fundamentales
## Operaciones

::left::

### Servidor


````md magic-move
```gql
type Query {
  posts: [Post]
}
```

```gql
type Query {
  posts: [Post!]!
}
```
````

<v-click>

```gql
type Post {
  title: String!
  content: String!
  likes: Int!
  isPinned: Boolean
  author: Author!
}

type Author {
  name: String!
  username: String!
  followers: Int!
}
```
</v-click>

::center::

<v-click>

### Cliente

```gql
query {
  posts {
    title
    content
    likes
  }
}
```
</v-click>

::right::

<v-click>

### Respuesta

```json
{
  "data": {
    "posts": [
      {
        "title": "Mi primer premio Nobel",
        "content": "Acabo de ganar mi primer premio...",
        "likes": 21312,
      }
    ]
  }
}
```
</v-click>


---
layout: three-cols-header
layoutClass: gap-4
---

# Conceptos Fundamentales
## Operaciones

::left::

### Servidor

```gql
type Query {
  posts: [Post!]!
}
```

```gql
type Post {
  title: String!
  content: String!
  likes: Int!
  isPinned: Boolean
  author: Author!
}

type Author {
  name: String!
  username: String!
  followers: Int!
}
```

::center::

### Cliente

```gql {6-8}
query {
  posts {
    title
    content
    likes
    author {
      name
      username
    }
  }
}
```

::right::

### Respuesta

```json {8-11}
{
  "data": {
    "posts": [
      {
        "title": "Mi primer premio Nobel",
        "content": "Acabo de ganar mi primer premio...",
        "likes": 21312,
        "author": {
          "name": "Donald Trump",
          "username": "@donaldtrump",
        }
      }
    ]
  }
}
```

---
layout: three-cols-header
transition: view-transition
layoutClass: gap-4
---

# Conceptos Fundamentales
## Operaciones

::left::

### Servidor

```gql
type Mutation {
  createPost(post: PostInput!): Post!
}
```

<v-click>
```gql
input PostInput {
  title: String!
  content: String!
  likes: Int!
  isPinned: Boolean
}
type Post {
  id: ID!
  title: String!
  content: String!
  likes: Int!
  isPinned: Boolean
}
```
</v-click>

::center::

<v-click>

### Cliente

```gql
mutation {
  createPost(post: {
    title: "Mi premio Nobel",
    content: "Acabo de ganar...",
    likes: 21312,
  }) {
    id
    title
    content
    likes
  }
}
```
</v-click>

::right::

<v-click>

### Respuesta

```json
{
  "data": {
    "createPost": {
        "id": "1",
        "title": "Mi premio Nobel",
        "content": "Acabo de ganar...",
        "likes": 21312
      }
  }
}
```
</v-click>

---
layout: three-cols-header
layoutClass: gap-4
---

# Conceptos Fundamentales
## Operaciones

::left::

### Servidor

```gql
type Mutation {
  createPost(post: PostInput!): Post!
}
```

```gql {6,14}
input PostInput {
  title: String!
  content: String!
  likes: Int!
  isPinned: Boolean
  author: ID!
}
type Post {
  id: ID!
  title: String!
  content: String!
  likes: Int!
  isPinned: Boolean
  author: Author!
}
```

::center::


### Cliente

```gql {6,12-14}
mutation {
  createPost(post: {
    title: "Mi premio Nobel",
    content: "Acabo de ganar...",
    likes: 21312,
    author: "7"
  }) {
    id
    title
    content
    likes
    author {
      name
    }
  }
}
```

::right::


### Respuesta

```json {8-10}
{
  "data": {
    "createPost": {
        "id": "1",
        "title": "Mi premio Nobel",
        "content": "Acabo de ganar...",
        "likes": 21312,
        "author": {
          "name": "Donald"
        }
      }
  }
}
```

---
layout: two-cols-header
layoutClass: gap-4
---

# Resumen

::left::

### Entidades

```gql
type Post {
  id: ID!
  title: String!
  content: String!
  likes: Int!
  author: Author!
}

type Author {
  name: String!
  username: String!
  followers: Int!
}

input PostInput {
  title: String!
  content: String!
  likes: Int!
  author: ID!
}
```

::right::

### Operaciones

```gql
type Query {
  post(id: ID!): Post!
  
  posts: [Post!]!
}

type Mutation {
  createPost(post: PostInput!): Post!

  updatePost(id: ID!, post: PostInput!): Post!

  deletePost(id: ID!): Post!
}
```

---
layout: center
---

<img src="/cortisol.png" width="300" />

---
layout: center
---

<!-- <iframe width="225" height="500" src="https://www.youtube.com/embed/UedSFqHvpjg?autoplay=1&start=0&mute=1" title="Subway surfers 8Ball Pool Rio random board 🎱 #subwaysurfers #shorts" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" ></iframe> -->

<iframe width="300" height="500" src="https://www.youtube.com/embed/jogOgaVzpNs?&start=0&mute=1" title="Historias de frutas #lifehack #ia #historia #funny #frutas" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" ></iframe>


---
layout: two-cols
layoutClass: gap-4 items-center
---

```json {9-11}
{
  "data": {
    "posts": [
      {
        "id": "1",
        "title": "Mi premio Nobel",
        "content": "Acabo de ganar...",
        "likes": 21312,
        "author": {
          "name": "Donald"
        }
      }
    ]
  }
}
```

::right::

<v-click>

<img src="/db-diagram.png">

</v-click>

---

# DataLoader

````md magic-move
```ts [loaders.ts] {*|2|3-5}
export const loaders = {
  Post: {
    author: (posts: any[]) => {
      //...
    }
  }
}
```

```ts [loaders.ts] {3-8|4|6|3-8}
export const loaders = {
  Post: {
    author: (posts: any[]) => {
      const ids: string[] = posts.map(({ author }) => author)

      const authors = await getAuthorsIn(ids)

      return authors
    }
  }
}
```
````

<!--
Beneficios:
- Mantiene los dominios aislados (DDD)
- Tiene un gran rendimiento
- Puede cachear objetos por su ID, de manera que solo te pide los que no tiene
-->


---
class: h-full flex flex-col
---

# Otros Beneficios

<div class="flex-1 grid items-center">

<ThemeVideo lightSrc="/graphql.mov" darkSrc="/graphql-dark.mov" />

</div>

<!--
- Autodocumentado por defecto
- Cache
- Batching
- Campos Calculados
- Tipos autogenerados (TypeScript)
- Versionado (@deprecated)
- Suscripciones (WebSockets / SSE)
- Directivas (autenticacion, manejo de roles, prevencion de DDoS)
- Recepción y envío de archivos binarios (FormData)
- Compatibilidad completa con REST
-->

---
layout: center
---

# ¿Cómo integro GraphQL en mi empresa?

<!--
Opciones:

1. Crea un proyecto pequeño donde la gente pueda probar
2. Crea un sevicio que consuma tu api REST actual
-->

---
class: h-full flex flex-col
---

## Enlaces de Interés

<div class="flex-1 min-h-0 grid items-center grid-cols-2 grid-rows-2 gap-4 p-4">

  <v-click>

  <a href="https://graphql.org/" class="w-full h-full object-contain border-b-0!">
    <ThemeImage lightSrc="/graphql-site.png" darkSrc="/graphql-site-dark.png" class="w-full h-full object-contain" />
  </a>

  </v-click>

  <v-click>

  <a href="https://the-guild.dev/graphql/yoga-server" class="w-full h-full object-contain border-b-0!">
    <img src="/yoga-site.png" class="w-full h-full object-contain">
  </a>

  </v-click>

  <v-click>

  <a href="https://chromewebstore.google.com/detail/graphql-network/kioemmijacihfbmkedmodekdhggddgck" class="w-full h-full object-contain border-b-0!">
    <img src="/graphql-network-inspector.png" class="w-full h-full object-contain">
  </a>

  </v-click>

  <v-click>

  <a href="https://apollo.vuejs.org/" class="w-full h-full object-contain border-b-0!">
    <ThemeImage lightSrc="/vue-apollo-site.png" darkSrc="/vue-apollo-site-dark.png" class="w-full h-full object-contain" />
  </a>

  </v-click>
</div>

---
layout: custom-image-right
image: '/slides-qr-link.png'
backgroundSize: '15rem'
---

# REST In Peace
## Por qué y cómo con GraphQL

<div class="absolute bottom-10">

  ## Mario Ferrero
  ### Ingeniero Full Stack

  <div class="flex items-center gap-6 text-sm">
    <span class="font-700">
      @mariofdezzz
    </span>
    <div class="flex items-center">
      <a href="https://github.com/mariofdezzz" target="_blank" class="slidev-icon-btn">
        <carbon:logo-github />
      </a>
      <a href="https://substack.com/@mariofdezzz" target="_blank" class="slidev-icon-btn">
        <mingcute:substack-fill />
      </a>
      <a href="https://www.linkedin.com/in/mario-ferrero" target="_blank" class="slidev-icon-btn">
        <carbon:logo-linkedin />
      </a>
      <a href="https://mariofdezzz.dev" target="_blank" class="slidev-icon-btn">
        <clarity:world-line />
      </a>
    </div>
  </div>
</div>
