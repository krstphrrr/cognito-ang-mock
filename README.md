## angular setup 

once directory is created, populated with the following:

```sh
ng new %PROJECT-NAME% --routing true --style scss --directory ./%PROJECT-DIRECTORY%
```

Configure scss/bootstrap support:

```sh
npm install bootstrap bootstrap-icons
``` 

Enable bootstrap in the `angular.json` file:
```json
"styles": [
  "node_modules/bootstrap/scss/bootstrap.scss",
  "node_modules/bootstrap-icons/font/bootstrap-icons.css",
  "src/styles.scss"
],
"scripts": [
  "node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"
]
```

