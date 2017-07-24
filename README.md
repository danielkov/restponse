# RESTponse
A simple library that makes it extremely simple to streamline API responses.
___

Install the package with

```sh
npm i -s restponse
```

or use it with Yarn

```sh
yarn add restponse
```

This package has 0 dependencies (excluding devDependencies used for testing and coverage), and leverages the built in Node JS `http` module to provide status codes. Refer to said module to see what status codes you can include in your app.

### Usage example (with Express):

```js
const Restponse = require('restponse')
const restponse = new Restponse()

app.get('/', (req, res) => {
  res.send(restponse[200])
})
```

The endpoint will respond with the following:

```json
{
  "status": "200",
  "reason": "OK"
}
```

Extending with more options:

To add a new key and value pair to the generated JSON, you can just add it to the config object, which is a parameter of the constructor.

In this example we'll add version and name information:

```js
const restponse = new Restponse({
  version: '1.2',
  name: 'MyAPI'
})
```

The response to the previous request will now be:

```json
{
  "status": "200",
  "reason": "OK",
  "name": "MyAPI",
  "version": "1.2"
}
```

The type of the value for these can also be a number or a string, which will behave the same way, however if you provide a function, it will take the options object as the parameter and the returned value will be passed into the returned object.


```js
const restponse = new Restponse({
  url: function ({status, version}) {
    return `https://mywebsite.com/api/${version}/status/${status}`
  },
  version: '1.2'
})
```

The response to this request will now be:

```json
{
  "status": "200",
  "reason": "OK",
  "version": "1.2",
  "url": "https://mywebsite.com/api/1.2/status/200"
}
```

This feature is particularly useful if you want developers to have quick access to more information about your responses.

Finally if you want to add fields that only apply to specific statuses, you can do so by giving an object that has the specific key for the request.


```js
const restponse = new Restponse({
  message: {
    200: 'This means everything is fine.'
  }
})
```

Response:

```json
{
  "status": "200",
  "reason": "OK",
  "message": "This means everything is fine."
}
```

If you want to add objects (like arrays) to your response, you can do so after intialization. To add payload to the response, you can just add it as a property:

```js
app.get('/', (req, res) => {
  let response = Object.assign({}, restponse[200])
  response.payload = 'Welcome to index.'
  res.send(response)
})
```

You can also use the method, `extend()`, to add payload in a more convenient way. This will also make sure you do not mutate the objects of the class instance.

```js
app.get('/errors/404', (req, res) => {
  res.send(restponse.extend(404, {
    info: 'This is an example 404 response.'
  }))
})
```

The above request would return the following JSON response:

```json
{
  "status": 404,
  "reason": "Not found",
  "info": "This is an example 404 response."
}
```

## Contributing

Feel free to add PRs.
