var domElement = function(selector){
  this.selector = selector || null
  this.elems = typeof this.selector === 'string' ? null : selector
}

domElement.prototype.init = function(){
  if (typeof this.selector === 'string')
    this.elems = document.querySelectorAll(this.selector)
}

domElement.prototype.eventHandler = {
  events: [],
  bindEvent: function(evt, callback, targetElement){
    this.unbindEvent(evt, targetElement)
    targetElement.addEventListener(evt, callback, true)
    this.events.push({
      type: evt,
      evt: callback,
      target: targetElement
    })
  },
  findEvent: function(evt){
    return this.events.filter(function(ev){
      return (ev.type === evt)
    }, evt)[0]
  },
  unbindEvent: function(evt, targetElement){
    var foundEvent = this.findEvent(evt)

    if (foundEvent !== undefined){
      targetElement.removeEventListener(evt, foundEvent.evt, true)
    }

    this.events = this.events.filter(function(ev){
      return (ev.type !== evt)
    }, evt)
  }
}

domElement.prototype.on = function(evt, callback){
  if (this.elems.length){
    for (var i = 0; i < this.elems.length; i++){
      this.eventHandler.bindEvent(evt, callback, this.elems[i])
    }
  }else{
    if (this.elems.attributes !== undefined)
      this.eventHandler.bindEvent(evt, callback, this.elems)
  }
  return new domElement(this.elems)
}

domElement.prototype.off = function(evt){
  if (this.elems.length){
    for (var i = 0; i < this.elems.length; i++){
      this.eventHandler.unbindEvent(evt, this.elems[i])
    }
  }else{
    if (this.elems.attributes !== undefined)
      this.eventHandler.unbindEvent(evt, this.elems)
  }
  return new domElement(this.elems)
}

domElement.prototype.live = function(evt, target, callback){
  function newCallback(ev){
    if (ev.target.matches(target)) callback(ev)
  }
  if (this.elems.length){
    for (var i = 0; i < this.elems.length; i++){
      this.eventHandler.bindEvent(evt, newCallback, this.elems[i])
    }
  }else{
    if (this.elems.attributes !== undefined)
      this.eventHandler.bindEvent(evt, newCallback, this.elems)
  }
  return new domElement(this.elems)
}

domElement.prototype.val = function(newVal){
  if (newVal === undefined){

    if (this.elems.length){
      return this.elems[0].value
    }else{
      if (this.elems.attributes !== undefined)
        return this.elems.value
    }

  }else{

    if (this.elems.length){
      for (var i = 0; i < this.elems.length; i++){
        this.elems[i].value = newVal
      }
    }else{
      if (this.elems.attributes !== undefined)
        this.elems.value = newVal
    }
    return new domElement(this.elems)

  }
}

domElement.prototype.attr = function(attr, newVal){
  if (newVal === undefined){

    if (this.elems.length){
      return this.elems[0].getAttribute(attr)
    }else{
      if (this.elems.attributes !== undefined)
        return this.elems.getAttribute(attr)
    }

  }else{

    if (this.elems.length){
      for (var i = 0; i < this.elems.length; i++){
        this.elems[i].setAttribute(attr, newVal)
      }
    }else{
      if (this.elems.attributes !== undefined)
        this.elems.setAttribute(attr, newVal)
    }
    return new domElement(this.elems)

  }
}

domElement.prototype.delAttr = function(attr){
  if (this.elems.length){
    for (var i = 0; i < this.elems.length; i++){
      this.elems[i].removeAttribute(attr)
    }
  }else{
    if (this.elems.attributes !== undefined)
      this.elems.removeAttribute(attr)
  }
  return new domElement(this.elems)
}

domElement.prototype.append = function(elem){
  if (this.elems.length){
    for (var i = 0; i < this.elems.length; i++){ this.elems[i].append(elem) }
  }else{
    if (this.elems.attributes !== undefined){ this.elems.append(elem) }
  }
  return new domElement(this.elems)
}

domElement.prototype.insertBefore = function(elem, ref){
  if (this.elems.length){
    for (var i = 0; i < this.elems.length; i++){ this.elems[i].insertBefore(elem, ref) }
  }else{
    if (this.elems.attributes !== undefined){ this.elems.insertBefore(elem, ref) }
  }
}

domElement.prototype.prepend = function(html){
  if (this.elems.length){
    for (var i = 0; i < this.elems.length; i++){ this.elems[i].prepend(html) }
  }else{
    if (this.elems.attributes !== undefined){ this.elems.prepend(html) }
  }
  return new domElement(this.elems)
}

domElement.prototype.del = function(){
  if (this.elems.length){
    for (var i = 0; i < this.elems.length; i++){ this.elems[i].remove() }
  }else{
    if (this.elems.attributes !== undefined){ this.elems.remove() }
  }
}

domElement.prototype.hasClass = function(c){
  if (this.elems.length){
    return (this.elems[0].classList.contains(c) ? true : false)
  }else{
    if (this.elems.attributes !== undefined)
      return (this.elems.classList.contains(c) ? true : false)
  }
}

domElement.prototype.addClass = function(c){
  if (this.elems.length){
    for (var i = 0; i < this.elems.length; i++){
      this.elems[i].classList.add(c)
    }
  }else{
    if (this.elems.attributes !== undefined) this.elems.classList.add(c)
  }
  return new domElement(this.elems)
}

domElement.prototype.delClass = function(c){
  if (this.elems.length){
    for (let elem of this.elems){ elem.classList.remove(c) }
  }else{
    if (this.elems.attributes !== undefined) this.elems.classList.remove(c)
  }
  return new domElement(this.elems)
}

domElement.prototype.toggleClass = function(c){
  if (this.elems.length){
    for (var i = 0; i < this.elems.length; i++){
      if (this.elems[i].classList.contains(c)){
        this.elems[i].classList.remove(c)
      }else{
        this.elems[i].classList.add(c)
      }
    }
  }else{
    if (this.elems.attributes !== undefined){
      if (this.elems.classList.contains(c)){
        this.elems.classList.remove(c)
      }else{
        this.elems.classList.add(c)
      }
    }
  }
  return new domElement(this.elems)
}

domElement.prototype.html = function(html){
  if (html === undefined){

    if (this.elems.length){
      return this.elems[0].innerHTML
    }else{
      if (this.elems.attributes !== undefined)
        return this.elems.innerHTML
    }

  }else{

    if (this.elems.length){
      for (var i = 0; i < this.elems.length; i++){
        this.elems[i].innerHTML = html
      }
    }else{
      if (this.elems.attributes !== undefined)
        this.elems.innerHTML = html
    }
    return new domElement(this.elems)

  }
}

domElement.prototype.outer = function(){

  if (this.elems.length){
    return this.elems[0].outerHTML
  }else{
    if (this.elems.attributes !== undefined)
      return this.elems.outerHTML
  }

}

domElement.prototype.parent = function(){
  if (this.elems.length){
    return new domElement(this.elems[0].parentNode)
  }else{
    if (this.elems.attributes !== undefined)
      return new domElement(this.elems.parentNode)
  }
}

domElement.prototype.find = function(selector){
  if (this.elems.length){
    return new domElement(this.elems[0].querySelectorAll(selector))
  }else{
    if (this.elems.attributes !== undefined)
      return new domElement(this.elems.querySelectorAll(selector))
  }
}

domElement.prototype.blur = function(){
  if (this.elems.length){
    for (var i = 0; i < this.elems.length; i++){
      this.elems[i].blur()
    }
  }else{
    if (this.elems.attributes !== undefined)
      this.elems.blur()
  }
  return new domElement(this.elems)
}

domElement.prototype.css = function(json){
  if (this.elems.length){
    for (var i = 0; i < this.elems.length; i++){
      for (var key in json){
        if (json.hasOwnProperty(key))
          this.elems[i].style[key] = json[key]
      }
    }
  }else{
    if (this.elems.attributes !== undefined)
      for (var key in json){
        if (json.hasOwnProperty(key)){
          this.elems.style[key] = json[key]
        }
      }
  }
  return new domElement(this.elems)
}

domElement.prototype.serialize = function(){
  let obj = {}
  if (this.elems.length){
    for (let i = 0; i < this.elems.length; i++){
      let inputs = this.elems[i].querySelectorAll('[name]')
      for (let input of inputs){
        let name = input.getAttribute('name')
        let value = input.value
        obj[name] = value
      }
    }
  }else{
    let inputs = this.elems.querySelectorAll('[name]')
    for (let input of inputs){
      let name = input.getAttribute('name')
      let value = input.value
      obj[name] = value
    }
  }
  return obj
}

var $ = function(selector){
  var el = new domElement(selector)
  el.init()
  return el
}

var _ = {}

_.get = function(url, cb){

  var xhr = new XMLHttpRequest()
  xhr.open('GET', url, true)
  xhr.onload = function(e){
    var DONE = 4
    var OK = 200
    var CREATED = 201
    if (xhr.readyState === DONE){
      if (xhr.status === OK || xhr.status === CREATED){
        cb(xhr.responseText)
      }else{
        console.log(xhr.status)
      }
    }
  }

  xhr.send()

}

_.post = function(url, json, cb){

  if (!cb) {
    cb = json
    json = {}
  }

  var xhr = new XMLHttpRequest()
  xhr.open('POST', url, true)
  xhr.setRequestHeader('Content-Type', 'application/json')
  xhr.onload = function(e){
    var DONE = 4
    var OK = 200
    var CREATED = 201
    if (xhr.readyState === DONE){
      if (xhr.status === OK || xhr.status === CREATED){
        cb(xhr.responseText)
      }else{
        console.log(xhr.status)
      }
    }
  }

  xhr.send(JSON.stringify(json))

}

_.script = function(url, options){
  var tag = document.createElement('script')
  tag.src = url
  if (options){
    for (let key of Object.keys(options)){
      tag[key] = options[key]
    }
  }
  document.getElementsByTagName('head')[0].appendChild(tag)
}

_.css = function(url){
  var tag = document.createElement('link')
  tag.rel = "stylesheet"
  tag.type ="text/css"
  tag.href = url
  var head = document.getElementsByTagName('head')[0]
  head.insertBefore(tag, head.firstChild)
}

_.cookie = function(name, value, options){
  if (!value){
    let cookies = document.cookie.split(`;`)
    for (let cookie of cookies){
      if (!cookie){ continue }
      let chunks = cookie.split(`=`)
      let n = chunks[0].trim()
      let v = chunks[1].trim()
      if (n === name){ return v }
    }
  }else if (value === 'del'){
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/`
  }else{
    let str = `${name}=${value}`
    if (options){
      str += `;path=${options.path || '/'}`
      if (options.expires){ str += `;expires=${options.expires}` }
      if (options.maxage){  str += `;max-age=${options.maxage}` }
    }
    document.cookie = str
  }
}

_.clone = function(obj){ return JSON.parse(JSON.stringify(obj)) }
