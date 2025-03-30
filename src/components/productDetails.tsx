import { useNavigate, Form, ActionFunctionArgs, redirect, useFetcher } from "react-router-dom"
import { Product } from "../types"
import { formatCurrency } from "../utils"
import { deleteProduct } from "../services/ProductService"
type ProductDetailsProps = {
    product: Product
}

export async function action({ params }: ActionFunctionArgs) {
    console.log('from actions details', params.id);
    if (params.id) {
        if (confirm('Do you want to delete this product?')) {
            await deleteProduct(+params.id)
        }
    }
    return redirect('/')
}

export default function productDetails({ product }: ProductDetailsProps) {

    const fetcher = useFetcher()
    const isAvailable = product.availability
    const navigate = useNavigate()
    return (
        <tr className="border-b ">
            <td className="p-3 text-lg text-gray-800">
                {product.name}
            </td>
            <td className="p-3 text-lg text-gray-800">
                {formatCurrency(product.price)}
            </td>
            <td className="p-3 text-lg text-gray-800">
                <fetcher.Form method="POST">
                    <button
                        type="submit"
                        name="id"
                        value={product.id}
                        className={`${isAvailable ? 'text-black' : 'text-red-600'}
                        rounded-lg p-2 text-xs uppercase font-bold w-full border hover:cursor-pointer`}
                    >
                        {isAvailable ? 'Available' : 'Not Available'}
                    </button>
                </fetcher.Form>
            </td>
            <td className="p-3 text-lg text-gray-800 ">
                <div className="flex gap-2 items-center">
                    <button
                        onClick={() => navigate(`products/${product.id}/edit`)}
                        className="bg-indigo-600 text-white rounded-lg p-2 uppercase font-bold text-xs w-full"
                    >Edit</button>
                    <Form
                        className="w-full"
                        method="POST"
                        action={`products/${product.id}/delete`}
                    >
                        <input
                            type="submit"
                            value='Delete'
                            className="bg-red-600 text-white rounded-lg p-2 uppercase font-bold text-xs w-full"
                        />
                    </Form>
                </div>
            </td>
        </tr>
    )
}
