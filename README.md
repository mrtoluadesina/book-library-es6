# book-library 

A book Library system where a ​student​ and a ​teacher borrows books. When the copy of the book is no longer in the library, the library returns "book taken". There can be multiple copies of the same book in the library. The books are given in a ​first-come-first-serve ​manner, but when a teacher is requesting for the same book a student is requesting for, the teacher comes first and when a junior student is asking for the same book a senior student is asking for, the senior student comes first.
The Librarian is the Admin.

#### I implemented this project using Javascript ES2015

This project was to convert a former private repo into es6 and use as many es6 writing styles as I have learned to make this project work. Also to learn the usage of babel and how to install it on a project.

#### How to install Babel
```
  npm install --save-dev @babel/core @babel/cli

  // Simply add a "scripts" field to your package.json and put the babel command inside there as build

  "scripts": {
     "build": "babel src -d lib"
   }

  // Now from our terminal we can run:

  npm run build
```

### Then create a .babelrc configuration file
Create a .babelrc file in your root folder

```
  npm install @babel/preset-env --save-dev

  // In order to enable the preset you have to define it in your .babelrc file, like this:

  {
    "presets": ["@babel/preset-env"]
  }

```

