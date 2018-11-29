![bonjours madame](https://68.media.tumblr.com/9f64a063a3b05589a99b6fff1dd87f83/tumblr_o6wzsiZO9m1v1wvcuo1_400.png)

# Bonjour madame client.

## Goal
Get data in json format from [bonjour madame](http://dites.bonjourmadame.fr) website.

## Install

    yarn add bonjour-madame

or

    npm i bonjour-madame --save

## How to use

### TypeScript

    import {BonjourMadameClient} from 'bonjour-madame'
    const client = new BonjourMadameClient()

    // Get today image
    await client.get(true)

    // Get random image
    await client.get(false)

### JavaScript

    const BM = require('bonjour-madame')
    const client = new BM.BonjourMadameClient()

    // Get today image
    await client.get(true)

    // Get random image
    await client.get(false)

## Response

    { 
      title: '',
      today: true,
      imgUrl: '',
      pageUrl: ''
    }

## Examples

    See ./src/tests/index.ts or ./dist/tests/index.js

