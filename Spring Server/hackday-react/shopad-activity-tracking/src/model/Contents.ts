export interface Contents {
    productId: string,              // 상품ID
    channelNm: string,              // 채널이름
    productImage : ProductImage,    // 상품이미지 정보
    productName: string,            // 상품이름
    productUrl: string              // 상품 URL
}

export interface ProductImage {
    imageUrl: string
}