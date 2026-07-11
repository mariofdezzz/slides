---
theme: apple-basic
title: REST In Peace - Why GraphQL?
drawings:
  persist: false
transition: slide-left
comark: true
duration: 15min
layout: custom-image-right
image: '/profile.webp'
---

# REST In Peace
## Por qué y cómo con GraphQL

<div class="absolute bottom-10">

  ## Mario Ferrero
  ### Team Lead, Full Stack Engineer @ Alten / Airbus

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
🖐🏼 cuantos conocen GraphQL? de oidas

🖐🏼 cuantos han trabajado profesionalmente con GraphQL?
-->

---
layout: image
image: /homer-bush.gif
backgroundSize: 15em
---

<div></div>

<!--
Hoy voy a bajar al fango y a hablar de APIs REST

¿Cuantos trabajan con APIs REST en el día a día?
-->

---
transition: view-transition
---

# Exceso de información

```
GET /posts
```

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
]
```

<!--
Esto es solo un ejemplo.

Cuantos mas desarrolladores implementen nuestra api, mas notaremos este problema.

Una api así es difícil de entender e integrar.
-->

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
]
```
````

---
layout: image
image: /money.gif
backgroundSize: 25em
---

<div></div>

<!--
Al final la respuesta a todo esto es Backend For Frontend

Y si, es una solucion facil, pero en el fondo no es realmente versatil. Porque al final un caso de uso se repite varias veces por el codigo, y cuando creamos test, estamos probando la misma logica una y otra vez.

Y al final nuestro codigo se ve un poco asi: <NEXT>
-->

---
layout: image
image: /flex-tape.png
backgroundSize: 80%
---

<div></div>

<!--
La barca flota, pero da cero confianza.

Y cuando empiezas a tirar del hilo de esta idea, aparece milagrosamente una idea:
-->

---
layout: image
image: /ddd-book.png
backgroundSize: 15em
---

<div></div>

<!--
DDD es un enfoque de diseño de software que se centra en modelar código de forma que represente el dominio del negocio

Aqui es donde aparece GraphQL
-->

---
layout: center
---

# ✨ GraphQL ✨

<!--
Graph Query Language
-->

---
layout: center
---

<ThemeImage lightSrc="/graphql-diagram-light.png" darkSrc="/graphql-diagram-dark.png" class="w-[70%] mx-auto object-contain" />

---
layout: three-cols-header
layoutClass: gap-4 
transition: view-transition
---

# GraphQL
## Conceptos Fundamentales

::left::

### Servidor

```gql
type Post {
  title: String!
  content: String!
  likes: Int!
  isPinned: Boolean
}
```

<v-click>

```gql
type Query {
  posts: [Post!]!
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
        "likes": 21312
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

# GraphQL
## Conceptos Fundamentales

::left::

### Servidor


````md magic-move
```gql
type Post {
  title: String!
  content: String!
  likes: Int!
  isPinned: Boolean
}
```

```gql {6,8-12}
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

```gql
type Query {
  posts: [Post!]!
}
```

::center::

### Cliente

````md magic-move
```gql
query {
  posts {
    title
    content
    likes
  }
}
```

```gql {6-9}
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
````

::right::

### Respuesta

````md magic-move
```json
{
  "data": {
    "posts": [
      {
        "title": "Mi primer premio Nobel",
        "content": "Acabo de ganar mi primer premio...",
        "likes": 21312
      }
    ]
  }
}
```

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
````

---

# GraphQL
## Implementación

````md magic-move
```ts {*|4-8|9-13}
import { createSchema } from 'graphql-yoga'
 
export const schema = createSchema({
  typeDefs: /* GraphQL */ `
    type Query {
      hello: String
    }
  `,
  resolvers: {
    Query: {
      hello: () => 'world'
    }
  }
})
```
```ts
import { createServer } from 'node:http'
import { createSchema, createYoga } from 'graphql-yoga'
 
export const schema = createSchema({
  typeDefs: /* GraphQL */ `
    type Query {
      hello: String
    }
  `,
  resolvers: {
    Query: {
      hello: () => 'world'
    }
  }
})

const yoga = createYoga({ schema })
 
const server = createServer(yoga)

server.listen(4000, () => {
  console.info('Server is running on http://localhost:4000/graphql')
})
```
````

<!--
hoy van a averiguar como se escriben estos resolvers. Pero no es mucho mas complejo que lo que estamos viendo.

Antes de empezar, deben saber un par de conceptos: <NEXT>
-->

---
class: 'h-full'
---

# Operaciones

<div class="h-9/12 grid grid-cols-3 place-items-center gap-6">
  <v-click>

  <div class="text-center">
  <h2>Query</h2>

  <p>Peticiones de consulta (GET)</p>
  </div>

  </v-click>

  <v-click>

  <div class="text-center">
  <h2>Mutation</h2>

  <p>Peticiones de modificación (POST)</p>
  </div>

  </v-click>

  <v-click>

  <div class="text-center">
  <h2>Subscription</h2>

  <p>Peticiones con respuesta en tiempo real desde el servidor (WebSockets / Listener)</p>
  </div>

  </v-click>
</div>


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

<!--
Que vamos a hacer?

Unos van a implementar un frontend que consuma una API GraphQL, y otros van a implementar un backend que exponga esa API. Al final, juntaremos dos proyectos y veremos pros y contras.

De que van los proyectos. Existen dos opciones: crear un clon de twitter o de tiktok.

🖐🏼 Quienes van a implementar front?
-->


---

# GraphQL + Rust 

[![GraphQL + Rust](/gql+rust.png)](https://rust-laspalmas.dev/docs/gql-2026/rust-gql-es.pdf)

