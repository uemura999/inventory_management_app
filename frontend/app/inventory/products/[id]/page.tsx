"use client";

import { useForm } from "react-hook-form";
import { useEffect, useState } from 'react';
import productsData from '../sample/dummy_products.json';
import inventoriesData from '../sample/dummy_inventories.json';
type ProductData = {
    id: number;
    name: string;
    price: number;
    description: string;
};
type InventoryData = {
    id: number;
    type: string;
    date: string;
    unit: number;
    quantity: number;
    price: number;
    inventory: number;
};

const Page = ({ params }: {
    params: { id: number },
}) => {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [product, setProduct] = useState<ProductData>({ id: 0, name: '', price: 0, description: '' });
    const [data, setData] = useState<InventoryData[]>([]);
    
    useEffect(() => {
        const selectedProduct: ProductData = productsData.find(v => v.id == params.id) ?? {
            id: 0,
            name: "",
            price: 0,
            description: ","
        };
        setProduct(selectedProduct);
        setData(inventoriesData);
    }, []);
    return (
        <>
            <h1>商品在庫管理</h1>
            <h2>在庫処理</h2>
            <form >
                <div>
                    <label>商品名：</label>
                    <span>{product.name}</span>
                </div>
                <div>
                    <label>数量 : </label>
                    <input type="text" />
                </div>
                <button>商品を仕入れる</button>
                <button>商品を卸す</button>
            </form>
            <h3>在庫履歴</h3>
            <table>
                <thead>
                    <tr>
                        <th>処理種別</th>
                        <th>処理日時</th>
                        <th>単価</th>
                        <th>数量</th>
                        <th>価格</th>
                        <th>在庫数</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((data: InventoryData) => (
                        <tr key={data.id}>
                            <td>{data.type}</td>
                            <td>{data.date}</td>
                            <td>{data.unit}</td>
                            <td>{data.quantity}</td>
                            <td>{data.price}</td>
                            <td>{data.inventory}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default Page