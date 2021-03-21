<h1 align="center">
  Swish Design 🏀
</h1>
<hr />
<p align="center" style="font-size: 1.2rem;">A simple, customizable design package that has three design goals: WAI-ARIA compliance, performance, and cross-device/platform support.</p>

[![Build Status][build-badge]][build]
[![Coverage Status][coverage-badge]][coverage]
[![NPM Info][npm-info-badge]][npm-info]
[![HitCount][hit-count-badge]][hit-count]


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

### v1.0

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

Our first major release will contain the components listed above. We make minor releases in two week sprints. Components whose status is marked 🛠️ fall under the minor release.

## Contributing to Swish

To the reader, we feel you're more than welcome to contribute to this project. We'd be thankful for you. Please recognize that Swish is in its baby stages and does not have prototyped assets to aid development; therefore, your implementation of expressing user interaction (styling) will be a truly collaborative process with our team.

### 🍴 Step 1. Fork

In order to contribute to Swish Design, you need to fork this repo and develop on your local machine.

```
git clone https://github.com/krfong916/swish-design.git
```

If you aren't familiar with how to fork and clone repos, follow this [guide](https://help.github.com/en/github/getting-started-with-github/fork-a-repo)

### 📚 Step 2. Run Storybook

To run storybook, run

```
npm run storybook
```

or if you're using yarn

```
yarn storybook
```

And open your browser to `localhost:6006`

### 💻 Step 3. Make Your Changes

You can find specifications of features to implement and changes to make [here](https://github.com/krfong916/swish-design/issues). Create a new branch from `main` and implement your changes on that branch: `git checkout -b _branch__name__here_`.
In addition to the tasks listed for the issue, here are some guidelines to consider when developing

- Provide full test coverage
- Meet accessibility guidelines
- Prioritize readability and careful comments, rather than clever code and optimizations

After you've completed every task, and are satisfied with your changes, submit a pull request!

### 📄 Step 4. Submit a Pull Request

Last 400m until the finish! At this step, please submit a pull request describing the changes you implemented, and any code that you'd like for us to pay special attention to. After reviewing together, even if your changes need further development, it's important to acknowledge that you're taking a step in the right direction. Once your pull request has been approved... merge that thang to the main branch!!

### 😸🍾 Step 5. Celebrate!

You are now a contributor to Swish and the open source community! We sincerely appreciate your efforts to make Swish a great project to use. We're one small project, and with your help, we're able to make the web a better place together.

## 🎉👏 Contributors

Once your changes are accepted we will add your name to the list of contributors!

[build-badge]: https://travis-ci.com/krfong916/swish-design.svg?branch=main
[build]: https://travis-ci.com/krfong916/swish-design
[coverage-badge]: https://coveralls.io/repos/github/krfong916/swish-components/badge.svg?branch=main
[coverage]: https://coveralls.io/github/krfong916/swish-design?branch=main
[npm-info-badge]: https://badge.fury.io/js/swish-design.svg 
[npm-info]: https://badge.fury.io/js/swish-design
[hit-count-badge]: http://hits.dwyl.com/krfong916/swish-design.svg
[hit-count]: http://hits.dwyl.com/krfong916/swish-design
