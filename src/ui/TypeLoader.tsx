import React, { FC } from 'react'
import ContentLoader from 'react-content-loader'

const TypeLoader: FC = () => {
  return (
    <ContentLoader
      speed={2}
      width={166}
      height={20}
      viewBox="0 0 166 20"
      backgroundColor="#f2f2f2"
      foregroundColor="#ecebeb"
    >
      <rect x="82" y="109" rx="0" ry="0" width="1" height="1" />
      <rect x="0" y="0" rx="0" ry="0" width="166" height="16" />
    </ContentLoader>
  )
}

export default TypeLoader