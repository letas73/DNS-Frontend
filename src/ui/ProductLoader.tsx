import React, { FC } from 'react'
import ContentLoader from 'react-content-loader'

const ProductLoader: FC = () => {
  return (
    <ContentLoader
      speed={2}
      width={245}
      height={302}
      viewBox="0 0 245 302"
      backgroundColor="#f2f2f2"
      foregroundColor="#ecebeb"
    >
      <rect x="82" y="109" rx="0" ry="0" width="1" height="1" />
      <rect x="49" y="0" rx="0" ry="0" width="160" height="160" />
      <rect x="225" y="0" rx="100" ry="100" width="20" height="20" />
      <rect x="0" y="172" rx="0" ry="0" width="245" height="66" />
      <rect x="0" y="245" rx="0" ry="0" width="149" height="44" />
      <rect x="154" y="245" rx="0" ry="0" width="44" height="44" />
      <rect x="202" y="245" rx="0" ry="0" width="44" height="44" />
    </ContentLoader>
  )
}

export default ProductLoader