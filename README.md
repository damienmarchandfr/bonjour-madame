![bonjours madame](https://68.media.tumblr.com/9f64a063a3b05589a99b6fff1dd87f83/tumblr_o6wzsiZO9m1v1wvcuo1_400.png)

# Bonjour madame client.

[![Build Status](https://travis-ci.com/damienmarchandfr/bonjour-madame.svg?branch=master)](https://travis-ci.com/damienmarchandfr/bonjour-madame)

## Goal

Get data in json format from [bonjour madame](http://dites.bonjourmadame.fr) website.

## Install

    yarn add bonjour-madame

or

    npm i bonjour-madame --save

## How to use

### TypeScript

    import {BonjourMadameClient} from 'bonjour-madame'
    import * as moment from 'moment'
    const client = new BonjourMadameClient()

    // Get today image with html source
    await client.get(true)

    // Get today image without html source
    await client.get(false)

    // Get image at date
    await client.getAtDate(moment().substract(1,'day').toDate())

### JavaScript

    const BM = require('bonjour-madame')
    const moment = require('moment')
    const client = new BM.BonjourMadameClient()

    // Get today image with html source
    await client.get(true)

    // Get today image without html source
    await client.get(false)

    // Get image at date
    await client.getAtDate(moment().substract(1,'day').toDate())

## Response

    {
      title: '',
      imgUrl: '',
      pageUrl: '',
      pageSource? : ''
    }

## Examples

    See ./src/example/index.ts or ./src/example/index.js
