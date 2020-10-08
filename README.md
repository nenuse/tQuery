# tQuery
Tiny version of jQuery reduced to basic functionality

## DOM Manipulation

### Select DOM

```javascript
var elems = $('div');
```

### DOM Methods

* `.on(event, callback)`
* `.off(event)`
* `.val([value])`
* `.attr([attribute])`
* `.delAttr(attribute)`
* `.append(html)`
* `.prepend(html)`
* `.del()`
* `.hasClass(class)`
* `.addClass(class)`
* `.delClass(class)`
* `.html([html])`
* `.parent()`
* `.find(selector)`
* `.blur()`
* `.css(json)`

### Procedural Methods

Available through the `_` variable.

* `_.json(url, [json], callback)` sends a POST request to url with an optional JSON body, then fires the callback function with 1 argument containing the response
* `_.file(url, file, callback)` sends a POST request to a url containing a user selected file, callback as previous one
* `_.script(url)` loads into the document the .js file located in url
* `_.css(url)` loads into the document the .css file located in url
