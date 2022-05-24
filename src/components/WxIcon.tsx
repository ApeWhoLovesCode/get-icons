import React, { useEffect, useState } from 'react';
import IconData from "../wx-icons-test";

export interface WxIconProps {
  name?: string
  color?: string | string[]
  size?: number
}

const WxIcon = React.forwardRef<HTMLSpanElement, WxIconProps>((props, ref) => {
  const { color, size, name } = props
  const [iconSrc, setIconSrc] = useState<string>('')

  useEffect(() => {
    /** 替换icon数据中的大小和颜色 */
    const replaceState = () => {
      function escape(str: string) {
        return str.replace('#', '%23')
      }
      if(name && IconData?.[name]) {
        let str = IconData[name]
        str = str.replaceAll('@svgSize', String(size))
        if (typeof color === 'string') {
          str = str.replace('@svgColor1', escape(color))
        } else {
          color?.forEach((item,i) => {
            str = str.replace(`@svgColor${i + 1}`, escape(item))
          })
        }
        return str
      }
      return ''
    }
    setIconSrc(replaceState())
  }, [color, size, name])

  return (
    <span 
      ref={ref}
      className="wx-yb-icon"
      style={{backgroundImage: `url("${iconSrc}")`, width: size + 'px', height: size + 'px'}}
    />
  )
})

WxIcon.defaultProps = {
  color: '#aaa',
  size: 16
};

export default WxIcon