export interface Products {
    count: number
    products: ProductElement[]
}

export interface ProductElement {
    brand: string
    description: string
    image: Image
    price: number
    _id: string
}

enum Image {
    WWWLiderClCatalogoImagesCatalogoNoPhotoJpg = 'www.lider.cl/catalogo/images/catalogo_no_photo.jpg'
}
