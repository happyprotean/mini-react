function createTextNode(text) {
  // 文本节点具有特殊类型
  return {
    type: 'TEXT_ELEMENT',
    props: {
      nodeValue: text,
      children: []
    }
  }
}

function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map(child => {
        return typeof child === 'string' ? createTextNode(child) : child
      })
    }
  }
}

// el: 虚拟节点object, container: 节点所在的容器
function render(el, container) {
  // 1. 创建节点
  const dom =
    el.type === 'TEXT_ELEMENT'
      ? document.createTextNode('')
      : document.createElement(el.type)

  // 2. 设置属性
  Object.keys(el.props).forEach(key => {
    if (key !== 'children') {
      dom[key] = el.props[key]
    }
  })

  // 递归处理children
  const children = el.props.children
  children.forEach(child => {
    render(child, dom)
  })

  // 3. 添加到节点树
  container.append(dom)
}

const React = {
  render,
  createElement,
  createTextNode
}

export default React
