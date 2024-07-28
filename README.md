# Blog Frontend

This is the frontend part of the project, designed to provide a user interface for interacting with a blog backend API. It includes functionalities for user registration, login, creating and managing posts, and viewing content.

## Table of Contents

- [Blog Frontend](#blog-frontend)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Build for Production](#build-for-production)
  - [API Endpoints](#api-endpoints)
    - [Posts](#posts)
  - [Contributing](#contributing)
    - [Key Points:](#key-points)

## Overview

The Blog Frontend provides a complete interface for managing a blog. Key features include:

- **User Authentication**: Allows users to register, login, and manage their session.
- **Post Management**: Users can create, read, update, and delete blog posts.
- **User Interface**: Built with modern JavaScript frameworks and libraries, it ensures a responsive and intuitive experience.

The frontend communicates with a backend API to handle data operations. It uses RESTful APIs for interactions and JWT for user authentication.

## Installation

To set up the frontend, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/estecore/blog_frontend.git
   cd blog_frontend

   ```

2. **Install dependencies:**

Make sure you have Node.js installed. Then, run:

```
npm install
```

or if you're using Yarn:

```
yarn install
```

## Usage

```
npm run dev
```

or with Yarn:

```
yarn start
```

This will start the development server and open your application in the default web browser on http://localhost:1337/

## Build for Production

To create a production build, run:

```
npm run build
```

or with Yarn:

```
yarn build
```

The production build will be created in the build directory.

## API Endpoints

The frontend communicates with the backend API. Here are the main endpoints used:

**Authentication**
**Register User**

_http_

```
POST /auth/register
```

**Request Body:**

_json_

```
{
  "fullName": "John Doe",
  "email": "johndoe@example.com",
  "password": "yourpassword",
  "avatarUrl": "http://example.com/avatar.jpg"
}
```

**Response:**

_json_

```
{
  "userData": {
    "fullName": "John Doe",
    "email": "johndoe@example.com",
    "avatarUrl": "http://example.com/avatar.jpg"
  },
  "token": "jwt-token"
}
```

**Login User**

_http_

```
POST /auth/login
```

**Request Body:**

_json_

```
{
"email": "johndoe@example.com",
"password": "yourpassword"
}
```

**Response:**

_json_

```
{
"userData": {
"fullName": "John Doe",
"email": "johndoe@example.com",
"avatarUrl": "http://example.com/avatar.jpg"
},
"token": "jwt-token"
}
```

### Posts

**Get All Posts**

_http_

```
GET /posts
```

**Get One Post**

_http_

```
GET /posts/:id
```

**Create Post**

_http_

```
POST /posts
```

**Request Body:**

_json_

```
{
"title": "Post Title",
"text": "Post content",
"imageUrl": "http://example.com/image.jpg",
"tags": "tag1,tag2"
}
```

**Response:**

_json_

```
{
"\_id": "post-id",
"title": "Post Title",
"text": "Post content",
"imageUrl": "http://example.com/image.jpg",
"tags": ["tag1", "tag2"],
"user": "user-id",
"viewsCount": 0,
"createdAt": "2024-01-01T00:00:00.000Z",
"updatedAt": "2024-01-01T00:00:00.000Z"
}
```

**Update Post**

_http_

```
PATCH /posts/:id
```

**Request Body:**

_json_

```
{
"title": "Updated Title",
"text": "Updated content",
"imageUrl": "http://example.com/updated-image.jpg",
"tags": "tag1,tag2,tag3"
}
```

**Response:**

_json_

```
{
"success": true
}
```

**Delete Post**

_http_

```
DELETE /posts/:id
```

**Response:**

_json_

```
{
"success": true
}
```

## Contributing

We welcome contributions! If you have suggestions, improvements, or bug fixes, please follow these steps:

Fork the repository.
Create a feature branch.
Commit your changes.
Push to the feature branch.
Open a pull request.
License
This project is licensed under the MIT License. See the LICENSE file for details.

### Key Points:

- **Installation**: Instructions on how to set up the project.
- **Usage**: How to start the development server and build the project for production.
- **API Endpoints**: Description of how the frontend interacts with the backend.
- **Contributing**: Guidelines for contributing to the project.
- **License**: Information about the project's license.

Adjust the URLs, endpoints, and any other details as per your project's specifics.
