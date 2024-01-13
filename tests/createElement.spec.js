import React from '../core/React'
import { it, expect, describe } from 'vitest'

describe('createElement', () => {
  it('should return vdom when props is null', () => {
    const el = React.createElement('div', null, 'hi')
    expect(el).toEqual({
      type: 'div',
      props: {
        children: [
          {
            type: 'TEXT_ELEMENT',
            props: {
              nodeValue: 'hi',
              children: [],
            },
          },
        ],
      },
    })
  })
  it('should return vdom when props valid', () => {
    const el = React.createElement(
      'div',
      { id: 'app' },
      'hi',
      ' ',
      React.createTextNode('react')
    )
    expect(el).toEqual({
      type: 'div',
      props: {
        id: 'app',
        children: [
          {
            type: 'TEXT_ELEMENT',
            props: {
              nodeValue: 'hi',
              children: [],
            },
          },
          {
            type: 'TEXT_ELEMENT',
            props: {
              nodeValue: ' ',
              children: [],
            },
          },
          {
            type: 'TEXT_ELEMENT',
            props: {
              nodeValue: 'react',
              children: [],
            },
          },
        ],
      },
    })
  })
})

describe('createTextNode', () => {
  it('should return vdom', () => {
    const el = React.createTextNode('react')
    expect(el).toEqual({
      type: 'TEXT_ELEMENT',
      props: {
        nodeValue: 'react',
        children: [],
      },
    })
  })
})
