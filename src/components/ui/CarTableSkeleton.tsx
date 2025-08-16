import React from 'react'

const CarTableSkeleton = () => {
    return (
        <tbody>
            {
                Array(10).fill(0)?.map((_, index) => (
                    <tr key={index} className="border-t hover:bg-slate-100">
                        <td className="py-3 px-6"><button className='bg-gray-300 p-2'></button></td>
                        <td className="py-3 px-6"><button className='bg-gray-300 py-2 w-[70%]'></button></td>
                        <td className="py-3 px-6"><button className='bg-gray-300 py-2 w-[70%]'></button></td>
                        <td className="py-3 px-6"><button className='bg-gray-300 py-2 w-[70%]'></button></td>
                        <td className="py-3 px-6"><button className='bg-gray-300 py-2 w-[70%]'></button></td>
                        <td className="py-3 px-6"><button className='bg-gray-300 py-2 w-[70%]'></button></td>
                        <td className="py-3 px-6"><button className='bg-gray-300 py-2 w-[70%]'></button></td>
                        <td className="text-center"><button className='bg-gray-300 p-2'></button></td>
                        <td className="text-center"><button className='bg-gray-300 p-2'></button></td>
                    </tr>
                ))
            }
        </tbody>
    )
}

export default React.memo(CarTableSkeleton)