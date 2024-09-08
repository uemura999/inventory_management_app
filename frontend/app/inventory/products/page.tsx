'use client'

import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import productsData from './sample/dummy_products.json';
import Link from 'next/link';
type ProductData = {
    id: number | null;
    name: string;
    price: number;
    description: string;
};

const Page = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    //読み込みデータを保持
    const [data, setData] = useState<ProductData[]>([]);

    //データ読み込み
    useEffect(() => {
        setData(productsData);
    }, []);

    const [id, setId] = useState<number | null>(0);
    //submit時のactionを分岐させる
    const [action, setAction] = useState<string>("");
    const onSubmit = (event: any) : void => {
        const data: ProductData = {
            id: id,
            name: event.name,
            price: Number(event.price),
            description: event.description,
        };
        //actionによってHTTPメソッドと使用するパラメーターを切り替える
        if (action === "add") {
            handleAdd(data);
        } else if (action === "update") {
            if (data.id === null) {
                return;
            }
            handleEdit(data);
        } else if (action === "delete") {
            if (data.id === null) {
                return;
            }
            handleDelete(data.id);
        }
    };

    const handleShowNewRow = () => {
        setId(null);
        reset({
            name: "",
            price: "0",
            description: "",
        });
    };
    const handleAddCancel = () => {
        setId(0);
    };
    const handleAdd = (data: ProductData) => {
        setId(0);
    };
    const handleEditRow = (id: number | null) => {
        const selectedProduct: ProductData = data.find((v) => v.id === id) as ProductData;
        setId(selectedProduct.id);
        reset({
            name: selectedProduct.name,
            price: selectedProduct.price,
            description: selectedProduct.description,
        });
    };
    const handleEditCancel = () => {
        setId(0);
    };
    const handleEdit = (data: ProductData) => {
        setId(0);
    };
    const handleDelete = (id: number) => {
        setId(0);
    };
  return (
    <>
        <h1>商品一覧</h1>
        <button type='button' onClick={handleShowNewRow}>商品を追加する</button>
        <form onSubmit={handleSubmit(onSubmit)}>
            <table>
                <thead>
                    <tr>
                        <th>商品ID</th>
                        <th>商品名</th>
                        <th>単価</th>
                        <th>説明</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {id === null ? (
                        <tr>
                            <td></td>
                            <td>
                                <input type="text" id='name' {...register('name', { required: "必須項目です。", maxLength: { value: 100, message: "100文字以内で入力してください。" } })} />
                                {errors.name?.message && (
                                    <div>{String(errors.name?.message)}</div>
                                )}
                            </td>
                            <td>
                                <input type="number" id='price' {...register('price', { required: "必須項目です。", min: { value: 1, message: "1から999999の数値を入力してください。" }, max: { value: 999999, message: "1から999999の数値を入力してください。" } })} />
                                {errors.price?.message && (
                                    <div>{String(errors.price?.message)}</div>
                                )}
                            </td>
                            <td>
                                <input type="text" id='description' {...register('description')} />
                            </td>
                            <td></td>
                            <td>
                                <button type='button' onClick={() => handleAddCancel()}>キャンセル</button>
                                <button type='submit' onClick={() => setAction("add")}>登録する</button>
                            </td>
                        </tr>
                    ) : ("")}
                    {data.map((data: any) => id === data.id ? (
                        <tr key={data.id}>
                            <td>{data.id}</td>
                            <td>
                                <input type="text" id='name' {...register('name', { required: "必須項目です。", maxLength: { value: 100, message: "100文字以内で入力してください。" } })} />
                                {errors.name?.message && (
                                    <div>{String(errors.name?.message)}</div>
                                )}
                            </td>
                            <td>
                                <input type="number" id='price' {...register('price', { required: "必須項目です。", min: { value: 1, message: "1から999999の数値を入力してください。" }, max: { value: 999999, message: "1から999999の数値を入力してください。" } })} />
                                {errors.price?.message && (
                                    <div>{String(errors.price?.message)}</div>
                                )}
                            </td>
                            <td>
                                <input type="text" id='description' {...register('description')} />
                            </td>
                            <td></td>
                            <td>
                                <button type='button' onClick={() => handleEditCancel()}>キャンセル</button>
                                <button type='submit' onClick={() => setAction("update")}>更新する</button>
                                <button type='button' onClick={() => setAction("delete")}>削除する</button>
                            </td>
                        </tr>
                    ) : (
                        <tr key={data.id}>
                            <td>{data.id}</td>
                            <td>{data.name}</td>
                            <td>{data.price}</td>
                            <td>{data.description}</td>
                            <td><Link href={`/inventory/products/${data.id}`}>在庫処理</Link></td>
                            <td><button type='button' onClick={() => handleEditRow(data.id)}>更新・削除</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </form>
    </>
  )
}

export default Page