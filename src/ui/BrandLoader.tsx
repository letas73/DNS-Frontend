import React, { FC } from 'react'
import ContentLoader from 'react-content-loader'

const BrandLoader: FC = () => {
  return (
    <ContentLoader
      speed={2}
      width={136}
      height={69}
      viewBox="0 0 136 69"
      backgroundColor="#f2f2f2"
      foregroundColor="#ecebeb"
    >
      <rect x="82" y="109" rx="0" ry="0" width="1" height="1" />
      <rect x="0" y="0" rx="16" ry="16" width="136" height="69" />
    </ContentLoader>
  )
}

export default BrandLoader