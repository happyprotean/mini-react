let nextWorkUnit = null

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

function createDom(type) {
  return type === 'TEXT_ELEMENT'
    ? document.createTextNode('')
    : document.createElement(type)
}

function updateProps(dom, props) {
  Object.keys(props).forEach((key) => {
    if (key !== 'children') {
      dom[key] = props[key]
    }
  })
}

function initChildren(fiber) {
  const children = fiber.props.children
  let prevChild = null
  children.forEach((child, index) => {
    const newFiber = {
      type: child.type,
      props: child.props,
      child: null,
      parent: fiber,
      sibling: null,
      dom: null
    }
    if (index === 0) {
      fiber.child = newFiber
    } else {
      prevChild.sibling = newFiber
    }
    prevChild = newFiber
  })
}

function render(el, container) {
  nextWorkUnit = {
    dom: container,
    props: {
      children: [el]
    }
  }
}

function getParentSibling(parent) {
  let sibling = null
  while(parent) {
    sibling = parent.sibling
    if (sibling) break
    parent = parent.parent
  }
  return sibling
}

function performWorkOfUnit(fiber) {
  if (!fiber.dom) {
    const dom = (fiber.dom = createDom(fiber.type))

    fiber.parent.dom.append(dom)

    updateProps(dom, fiber.props)
  }

  initChildren(fiber)

  if(fiber.child) return fiber.child
  if (fiber.sibling) return fiber.sibling
  return getParentSibling(fiber.parent)
}

function workLoop(deadline) {
  let shouldYield = false
  while(!shouldYield && nextWorkUnit) {
    nextWorkUnit = performWorkOfUnit(nextWorkUnit)
    shouldYield = deadline.timeRemaining() < 10
  }
  requestIdleCallback(workLoop)
}

requestIdleCallback(workLoop)

export default {
  render,
  createElement,
  createTextNode,
}
