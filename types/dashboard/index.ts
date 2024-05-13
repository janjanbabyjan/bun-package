/*Recent Transaction*/
type recentTrans = {
    title: string;
    subtitle: string;
    textcolor: string;
    boldtext: boolean;
    line: boolean;
    link: string;
    url: string;
};

/*product performance*/
type productPerformanceType = {
    id: number;
    name: string;
    post: string;
    pname: string;
    status: string;
    statuscolor: string;
    budget: string;
};

/*Products card types*/
type productsCards = {
    title: string;
    link: string;
    photo: string;
    salesPrice: number;
    price: number;
    rating: number;
};

type ContentSection = {
    id: number;
    img: string;
    badge: string;
    date: string;
    view: string;
    title: string;
    desc: string;
    name: string;
};

type PortfolioSection = {
    img: string;
    title: string;
    desc: string;
};


export type { recentTrans, productPerformanceType, productsCards, ContentSection, PortfolioSection }