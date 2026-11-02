export interface TypeBasicImage {
	src: string
	alt?: string

	width?: number
	height?: number
}

export interface TypeBasicImageInfo {
	caption?: string
	location?: string
	date?: string
}

export type TypeBorderStyle = 'border' | 'none'
export type TypeImgFit = 'cover' | 'contain'

export type TypeBlenderRender = TypeBasicImage & {
	info?: TypeBasicImageInfo
	borderStyle?: TypeBorderStyle
	imgPixel?: boolean
}
export type TypePhoto = TypeBasicImage & { info?: TypeBasicImageInfo }
