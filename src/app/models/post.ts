export interface Post {
    title: string,
    permalink:string,
    excerpt:string,
    category:{
        categoryId: string,
        category:string
    },
    content: string,
    pathPostImg: string,
    isFeatured: boolean,
    views: number,
    status:string,
    createdAt: Date
}
