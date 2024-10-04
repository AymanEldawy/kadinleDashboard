
const Brand = ({product}) => {
  return (
    <div className="text-center">{product?.brand?.name}</div>
  )
}

export default Brand