# Eris Interactions
**Eris Interactions** is a simple to use, lightweight and fast **Interaction Handler** for the Node.js Discord library [Eris](https://www.npmjs.com/package/eris).

It supports two ways of handling interactions:
- Bulk collecting a specified amount of interactions over a set period of time
- Continuous listening for new interactions being made

The API is pretty straight forward and only requires the native event emitter as a dependency for fast event emitting.

# Getting Started
Simply install Eris Interactions via NPM `npm install eris-interactions` and require it wherever you need it!

# API 
#### Setting up a listener:
```js
new interactionCollector(client, message, options);
```
- **Eris.Client** `client` - *An Eris client*
- **Eris.Message** `message` - *An Eris message emitted from the `messageCreate` event.*
- **Object** `options` - *An object containing following options:*
    - **Function** `options.filter` - *A filter for the interactions that sould be collected.*
    - **Number** `options.maxMatches` - *The maximum amount of interactions to collect.*
    - **Number** `options.maxTime` - *The maximum amount of time the collector should run for in milliseconds.*

In addition to that a temporary listener needs to be attached to listen for the `interaction` event:
```js
.on('interaction', eventListener);
```
- **String** `'interaction'` - *The event name. This **MUST** stay the same!*
- **Function** `eventListener` - *The event listener which is passed an object.*
    - **Object** `Eris.ComponentInteraction` - *The object emitted from the `interaction` event*.
```js
.on('end', eventListener);
```
- **String** `'end'` - *The event name. This **MUST** stay the same!*
- **Function** `eventListener` - *The event listener which is passed a string.*
    - **String** `reason` - *The reson for the collector to stop, it can be `maxMatches` or `timeEnd`*.

# License
This repository makes use of the [MIT License](https://opensource.org/licenses/MIT) and all of its correlating traits.

#  
A small credit if this repository was to be used would be highly appreciated!\
If you liked the code please give it a star!
