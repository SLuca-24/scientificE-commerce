import rivista2 from './components/img/rivista2.2.png'
import rivista3 from './components/img/rivista3.3.png'
import rivista4 from './components/img/rivista4.4.png'
import rivista5 from './components/img/rivista5.5.png'
import rivista6 from './components/img/rivista1.png'

interface Product {
    id: number;
    productName: string;
    price: number;
    productImage: string;
}

export const PRODUCTS: Product[] = [

    {
        id: 2,
        productName: "Science - Renewable Energy",
        price: 0.002,
        productImage: rivista2

    },

    {
        id: 3,
        productName: "Produice - Renewable Energy",
        price: 0.005,
        productImage: rivista3

    },

    {
        id: 4,
        productName: "AI and Machine Learning",
        price: 0.01,
        productImage: rivista4

    },

    {
        id: 5,
        productName: "Best Science - The DNA",
        price: 0.1,
        productImage: rivista5

    },

    {
        id: 6,
        productName: "Scientice - The Space",
        price: 0.5,
        productImage: rivista6

    },
    
]