/* eslint-disable react/forbid-elements */
import * as React from 'react';
import classNames from 'classnames';
import type { IconDefinition } from '../types';

import Context from './Context';
import type { IconBaseProps } from './Icon';
import ReactIcon from './IconBase';
import { getTwoToneColor, TwoToneColor, setTwoToneColor } from './twoTonePrimaryColor';
import { normalizeTwoToneColors } from '../utils';

export interface AntdIconProps extends IconBaseProps {
  twoToneColor?: TwoToneColor;
}

export interface IconComponentProps extends AntdIconProps {
  icon: IconDefinition;
}

setTwoToneColor('#1890ff');

interface IconBaseComponent<Props>
  extends React.ForwardRefExoticComponent<Props & React.RefAttributes<HTMLSpanElement>> {
  getTwoToneColor: typeof getTwoToneColor;
  setTwoToneColor: typeof setTwoToneColor;
}

const Icon = React.forwardRef<HTMLSpanElement, IconComponentProps>((props, ref) => {
  const {
    className,
    icon,
    spin,
    rotate,
    // 感觉移动端没啥用 - 指定计算机按tab键时光标移动的顺序，值越小越先得到焦点
    tabIndex,
    onClick,
    twoToneColor,
    ...restProps
  } = props;

  const { prefixCls = 'anticon' } = React.useContext(Context);

  const classString = classNames(
    prefixCls,
    {
      [`${prefixCls}-${icon.name}`]: !!icon.name,
      [`${prefixCls}-spin`]: !!spin || icon.name === 'loading',
    },
    className,
  );

  let iconTabIndex = tabIndex;
  if (iconTabIndex === undefined && onClick) {
    iconTabIndex = -1;
  }

  const svgStyle = rotate
    ? {
        msTransform: `rotate(${rotate}deg)`,
        transform: `rotate(${rotate}deg)`,
      }
    : undefined;

  const [primaryColor, secondaryColor] = normalizeTwoToneColors(twoToneColor);

  return (
    <span
      role="img"
      aria-label={icon.name}
      {...restProps}
      ref={ref}
      tabIndex={iconTabIndex}
      onClick={onClick}
      className={classString}
    >
      <ReactIcon
        icon={icon}
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
        style={svgStyle}
      />
    </span>
  );
}) as IconBaseComponent<IconComponentProps>;

Icon.displayName = 'AntdIcon';
Icon.getTwoToneColor = getTwoToneColor;
Icon.setTwoToneColor = setTwoToneColor;

export default Icon;
