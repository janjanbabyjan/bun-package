import type { recentTrans, productPerformanceType, productsCards, BlogSection,PortfolioSection } from '@/types/dashboard/index';

/*--Recent Transaction--*/
const recentTransaction: recentTrans[] = [
    {
        title: '09:30 am',
        subtitle: 'Payment received from John Doe of $385.90',
        textcolor: 'primary',
        boldtext: false,
        line: true,
        link: '',
        url: ''
    },
    {
        title: '10:00 am',
        subtitle: 'New sale recorded',
        textcolor: 'secondary',
        boldtext: true,
        line: true,
        link: '#ML-3467',
        url: ''
    },
    {
        title: '12:00 am',
        subtitle: 'Payment was made of $64.95 to Michael',
        textcolor: 'success',
        boldtext: false,
        line: true,
        link: '',
        url: ''
    },
    {
        title: '09:30 am',
        subtitle: 'New sale recorded',
        textcolor: 'warning',
        boldtext: true,
        line: true,
        link: '#ML-3467',
        url: ''
    },
    {
        title: '09:30 am',
        subtitle: 'New arrival recorded',
        textcolor: 'error',
        boldtext: true,
        line: true,
        link: '',
        url: ''
    },
    {
        title: '12:00 am',
        subtitle: 'Payment Received',
        textcolor: 'success',
        boldtext: false,
        line: false,
        link: '',
        url: ''
    },
]

/*Basic Table 1*/
const productPerformance: productPerformanceType[] = [
    {
        id: 1,
        name: 'Sunil Joshi',
        post: 'Web Designer',
        pname: 'Elite Admin',
        status: 'Low',
        statuscolor: 'primary',
        budget: '$3.9'
    },
    {
        id: 2,
        name: 'Andrew McDownland',
        post: 'Project Manager',
        pname: 'Real Homes WP Theme',
        status: 'Medium',
        statuscolor: 'secondary',
        budget: '$24.5k'
    },
    {
        id: 3,
        name: 'Christopher Jamil',
        post: 'Project Manager',
        pname: 'MedicalPro WP Theme',
        status: 'High',
        statuscolor: 'error',
        budget: '$12.8k'
    },
    {
        id: 4,
        name: 'Nirav Joshi',
        post: 'Frontend Engineer',
        pname: 'Hosting Press HTML',
        status: 'Critical',
        statuscolor: 'success',
        budget: '$2.4k'
    },
    {
        id: 5,
        name: 'Tim Geroge',
        post: 'Web Designer',
        pname: 'Hosting Press HTML',
        status: 'Critical',
        statuscolor: 'indigo',
        budget: '$5.4k'
    }

];

/*--Products Cards--*/
import proimg1 from '/images/products/s4.jpg';
import proimg2 from '/images/products/s5.jpg';
import proimg3 from '/images/products/s7.jpg';
import proimg4 from '/images/products/s11.jpg';
const productsCard: productsCards[] = [
    {
        title: 'Boat Headphone',
        link: '/',
        photo: proimg1,
        salesPrice: 375,
        price: 285,
        rating: 4
    },
    {
        title: 'MacBook Air Pro',
        link: '/',
        photo: proimg2,
        salesPrice: 650,
        price: 900,
        rating: 5
    },
    {
        title: 'Red Valvet Dress',
        link: '/',
        photo: proimg3,
        salesPrice: 150,
        price: 200,
        rating: 3
    },
    {
        title: 'Cute Soft Teddybear',
        link: '/',
        photo: proimg4,
        salesPrice: 285,
        price: 345,
        rating: 2
    }
];


export { recentTransaction, productPerformance, productsCard, Blog, Portfolio };



//Blog

import blog1 from '/images/products/test1.png';
import blog2 from '/images/products/test2.png';
import blog3 from '/images/products/test3.png';

const Blog: BlogSection[] = [
    {
        img: blog1,
        badge: 'CSR',
        date: 'Apr 16, 2023',
        view: '27,567 Views',
        title: 'Banpu and Mahidol Invite High School and Vocational School',
        desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
        name: 'Mark R. Freeman'
    },
    {
        img: blog2,
        badge: 'Bussiness',
        date: 'Apr 16, 2023',
        view: '29,567 Views',
        title: 'Banpu Signs THB 2.4 Billion Deal with ADB to Bolster E-Mobility and Battery Businesses',
        desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
        name: 'James Robert'
    },
    {
        img: blog3,
        badge: 'Digital and Innovention',
        date: 'Apr 16, 2023',
        view: '28,567 Views',
        title: 'Banpu Shapes Digital & Innovation Team, Transforming “Personnel and Organization”',
        desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
        name: 'David William'
    },


];


//Portfolio

import s1 from '/images/portfolio/portfolio-1.jpg';
import s2 from '/images/portfolio/portfolio-2.png';
import s3 from '/images/portfolio/portfolio-3.jpg';
import s4 from '/images/portfolio/portfolio-4.jpg';
import s5 from '/images/portfolio/portfolio-5.jpg';
import s6 from '/images/portfolio/portfolio-6.jpg';

const Portfolio: PortfolioSection[] = [
    {
        img: s1,
        title: 'White Theming Background',
        desc: '3D Render',

    },
    {
        img: s2,
        title: 'The Heritage',
        desc: 'Illustration',
    },
    {
        img: s3,
        title: 'Belforte Fall',
        desc: 'Photography',
    },
    {
        img: s4,
        title: 'Ipsum neque libero',
        desc: 'React',
    },
    {
        img: s5,
        title: 'White Theming',
        desc: 'Graphics Design',
    },
    {
        img: s6,
        title: 'luctus neque purus',
        desc: 'Html',
    },
    
];
