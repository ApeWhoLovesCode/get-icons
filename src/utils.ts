import type { AbstractNode, IconDefinition } from './types';
import React, { useContext, useEffect } from 'react';
import IconContext from './components/Context';

import warn from 'rc-util/lib/warning';
import { updateCSS } from 'rc-util/lib/Dom/dynamicCSS';

import { generate as generateColor } from './lib/colors';

export function warning(valid: boolean, message: string) {
  warn(valid, `[@ant-design/icons] ${message}`);
}

export function isIconDefinition(target: any): target is IconDefinition {
  return (
    typeof target === 'object' &&
    typeof target.name === 'string' &&
    typeof target.theme === 'string' &&
    (typeof target.icon === 'object' || typeof target.icon === 'function')
  );
}

/** 正常化里面的属性，将class转换为calssName */
export function normalizeAttrs(attrs: Attrs = {}): Attrs {
  return Object.keys(attrs).reduce((acc: Attrs, key) => {
    const val = attrs[key];
    switch (key) {
      case 'class':
        acc.className = val;
        delete acc.class;
        break;
      default:
        acc[key] = val;
    }
    return acc;
  }, {});
}

export interface Attrs {
  [key: string]: string;
}

export function generate(
  node: AbstractNode,
  key: string,
  rootProps?: { [key: string]: any } | false,
): any {
  if (!rootProps) {
    // React.createElement(标签名，属性，子节点可以是数组也可以分开写多个参数)
    return React.createElement(
      node.tag,
      { key, ...normalizeAttrs(node.attrs) },
      (node.children || []).map((child, index) => generate(child, `${key}-${node.tag}-${index}`)),
    );
  }
  return React.createElement(
    node.tag,
    {
      key,
      ...normalizeAttrs(node.attrs),
      ...rootProps,
    },
    (node.children || []).map((child, index) => generate(child, `${key}-${node.tag}-${index}`)),
  );
}

export function getSecondaryColor(primaryColor: string): string {
  // choose the second color
  return generateColor(primaryColor)[0];
}

export function normalizeTwoToneColors(
  twoToneColor: string | [string, string] | undefined,
): string[] {
  if (!twoToneColor) {
    return [];
  }

  return Array.isArray(twoToneColor) ? twoToneColor : [twoToneColor];
}

// These props make sure that the SVG behaviours like general text. 
export const svgBaseProps = {
  width: '1em',
  height: '1em',
  fill: 'currentColor',
  'aria-hidden': 'true',
  focusable: 'false',
};

export const useInsertStyles = (styleStr: string = iconStyles) => {
  const { csp } = useContext(IconContext);
  useEffect(() => {
    updateCSS(styleStr, '@ant-design-icons', {
      prepend: true,
      csp,
    });
  }, []);
};

export const iconStyles = `
.anticon {
  display: inline-block;
  color: inherit;
  font-style: normal;
  line-height: 0;
  text-align: center;
  text-transform: none;
  vertical-align: -0.125em;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.anticon > * {
  line-height: 1;
}

.anticon svg {
  display: inline-block;
}

.anticon::before {
  display: none;
}

.anticon .anticon-icon {
  display: block;
}

.anticon[tabindex] {
  cursor: pointer;
}

.anticon-spin::before,
.anticon-spin {
  display: inline-block;
  -webkit-animation: loadingCircle 1s infinite linear;
  animation: loadingCircle 1s infinite linear;
}

@-webkit-keyframes loadingCircle {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@keyframes loadingCircle {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
`;


