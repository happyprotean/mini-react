function createTextNode(text) {
  return {
    type: 'TEXT_ELEMENT',
    props: {
      nodeValue: text,
      children: [],
    },
  }
}

function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map((child) => {
        return typeof child === 'string' ? createTextNode(child) : child
      }),
    },
  }
}

function render(el, container) {
  // 1. 创建dom元素
  const dom =
    el.type === 'TEXT_ELEMENT'
      ? document.createTextNode('')
      : document.createElement(el.type)

  // 2. 处理props
  Object.keys(el.props).forEach((key) => {
    if (key !== 'children') {
      dom[key] = el.props[key]
    }
  })

  // 3. 遍历并render子节点
  el.props.children.forEach((child) => {
    render(child, dom)
  })

  // 4. 添加dom到container中
  container.append(dom)
}

export default {
  render,
  createElement,
  createTextNode,
}
