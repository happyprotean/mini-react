import React from './React.js'

const ReactDOM = {
  createRoot: function (container) {
    return {
      render: function (el) {
        return React.render(el, container)
      },
    }
  },
}

export default ReactDOM
