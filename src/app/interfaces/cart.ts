export interface Cart {
    brand?: string
    description?: string
    image?: Image
    price?: number
    _id?: string
    onCart?: boolean
    quantity?: number
    totalPrice?: number
}

enum Image {
    WWWLiderClCatalogoImagesCatalogoNoPhotoJpg = 'www.lider.cl/catalogo/images/catalogo_no_photo.jpg'
}
