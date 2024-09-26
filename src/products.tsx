import rivista1 from './components/img/rivista1.png'
import rivista2 from './components/img/rivista2.png'
import rivista3 from './components/img/rivista3.png'
import rivista4 from './components/img/rivista4.png'
import rivista5 from './components/img/rivista5.png'
import rivista6 from './components/img/rivista6.png'
import rivista7 from './components/img/rivista7.png'
import rivista8 from './components/img/rivista8.png'
import rivista9 from './components/img/rivista9.png'


interface Product {
    id: number;
    productName: string;
    price: number;
    productImage: string;
}

export const PRODUCTS: Product[] = [



    {
        id: 1,
        productName: "Spientice - Space Technology",
        price: 0.5,
        productImage: rivista1

    },

    {
        id: 2,
        productName: "Renewable Energy (edition 2)",
        price: 0.005,
        productImage: rivista2

    },

    {
        id: 3,
        productName: "AI and Machine Learning",
        price: 0.01,
        productImage: rivista3

    },

    {
        id: 4,
        productName: "Best Science - The DNA",
        price: 0.1,
        productImage: rivista4

    },

    {
        id: 5,
        productName: "Renewable Energy (Ediotion 1)",
        price: 0.002,
        productImage: rivista5

    },

    {
        id: 6,
        productName: "Scientice - Neural Science",
        price: 0.08,
        productImage: rivista6

    },

    {
        id: 7,
        productName: "Qeiuntfic - Quantum Computing",
        price: 1.2,
        productImage: rivista7

    },

    {
        id: 8,
        productName: "Scientice - Deep Sea",
        price: 0.07,
        productImage: rivista8

    },

    {
        id: 9,
        productName: "Scientice - Arropace Engineering",
        price: 0.0001,
        productImage: rivista9

    },
    
]