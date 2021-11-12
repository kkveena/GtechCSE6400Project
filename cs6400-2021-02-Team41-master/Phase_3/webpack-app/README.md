# React Application for the WillMart Main Menu

## Files
Generally, you will only need to change the files under the `src` directory, and you can
find the corresponding report components under the `src/components` directory. Use the
other files in the root directory to test out your changes.

## Build your main.js bundle

Run `npm run build`

## Use your main.js bundle in the server package

1. Run `npm run build`
2. Copy the `main.js` file under the `dist` directory.
3. Replace the existing `main.js` in the server package with the one that you just generated. Found [here](https://github.gatech.edu/cs6400-2021-02-summer/cs6400-2021-02-Team41/blob/apodder/Phase_3/webapp/src/main/resources/static/main.js)
4. Make sure the `index.html` file has `<div id="app"></div>` within the body tag. Found [here](https://github.gatech.edu/cs6400-2021-02-summer/cs6400-2021-02-Team41/blob/apodder/Phase_3/webapp/src/main/resources/templates/index.html#L8)
```html
<body>
    <a th:text="${msg}"></a>|<a href="logout">logout</a>
    <div id="app"></div>
    <script src="main.js"></script>
</body>
```
5. Start the server.
6. Visit http://localhost:8080
7. Profit!!
