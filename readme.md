<h1 align="center">
  Swish Design 🏀
</h1>
<hr />
<p align="center" style="font-size: 1.2rem;">A simple, customizable design package that has three design goals: WAI-ARIA compliance, performance, and cross-device/platform support.</p>

[![Build Status][build-badge]][build]
[![Coverage Status][coverage-badge]][coverage]

## 📦 Install

```
npm i swish-design
```

or if you're using yarn

```
yarn add swish-design
```

## 🔨 Usage

Below demonstrates a simple example of using Swish in your application:

```js
import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'swish-design';

ReactDOM.render(
  <Button type="primary">Sick!</Button>
  document.getElementById('root');
)
```

### Content-Security-Policy

Some may be using this package with a strict Content-Security-Policy. Meaning, they cannot allow inline style tags to be injected into their document at runtime.
If your Content-Security-Policy does not allow 'unsafe-inline', one possible solution is to use Swish like so

```css
/* create a swishd.css file */
/* within the swishd.css file */
@import "swish-design";
```

```js
// in the entry point of your project
import "swishd.css";

// or if you're using a single instance of a Swish component, import swishd.css within that file
```

## 🗺 Roadmap

✅: Completed
🛠️: Building
📘: Todo

| Component      | Status |
| -------------- | ------ |
| Button         | ✅     |
| Input          | 🛠️     |
| Tags           | 🛠️     |
| Avatar         | 🛠️     |
| Card           | 📘     |
| Pagination     | 📘     |
| Dropdown       | 📘     |
| Checkbox Group | 📘     |

[build-badge]: https://travis-ci.com/krfong916/swish-design.svg?branch=main
[build]: https://travis-ci.com/krfong916/swish-design
[coverage-badge]: https://coveralls.io/repos/github/krfong916/swish-components/badge.svg?branch=main
[coverage]: https://coveralls.io/github/krfong916/swish-design?branch=main
