import React, { useEffect, useState, type FormEvent } from 'react'
import type { ICar } from '../../types'
import { Grid2x2, SquarePen, TableOfContents, Trash } from 'lucide-react';
import { useCar } from '../../api/hooks/useCar'
import CarCardSkeleton from '../../components/ui/CarCardSkeleton';
import CarTableSkeleton from '../../components/ui/CarTableSkeleton';

const initialState: ICar = {
    id: '',
    name: '',
    price: '',
    brand: '',
    color: '#000000',
    releaseDate: '',
    power: ''
}

const Cars = () => {
    const { createCar, deleteCar, getCarById, getCars, updateCar } = useCar()
    const [formStudent, setFormStudent] = useState<ICar>(initialState)
    const [updateStudent, setUpdateStudent] = useState<ICar | null>(null)
    const { data, isLoading } = getCars()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { value, name } = e.target;
        setFormStudent((p) => ({ ...p, [name]: value }));
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (updateStudent) {
            updateCar.mutate({
                id: updateStudent.id, data: {
                    ...formStudent,
                    price: Number(formStudent.price),
                    power: Number(formStudent.power)
                }
            }, {
                onSuccess: () => {
                    setFormStudent(initialState)
                    setUpdateStudent(null);
                }
            })
        } else {
            createCar.mutate(formStudent, {
                onSuccess: () => {
                    setFormStudent(initialState)
                }
            })
        }
    };

    const handleDelete = (id: string) => {
        if (updateStudent?.id == id) {
            setFormStudent(initialState)
            setUpdateStudent(null)
        }

        deleteCar.mutate(id)
    }

    const handleUpdate = (student: ICar) => {
        setFormStudent(student)
        setUpdateStudent(student)
    }

    const [style, setStyle] = useState<boolean>(JSON.parse(localStorage.getItem('style') || 'true'))

    useEffect(() => {
        localStorage.setItem('style', JSON.stringify(style))
    }, [style])

    return (
        <div className="container mx-auto py-10 min-h-screen text-white">
            <div className="mb-10 rounded-xl text-black">
                <h2 className="text-xl mb-4">Create Car</h2>
                <form onSubmit={handleSubmit} className="grid md:grid-cols-1 gap-4 " action="">
                    <input
                        required
                        name="name"
                        value={formStudent.name}
                        onChange={handleChange}
                        className="border bg-[#EDEFF2] border-slate-500 rounded-lg py-2 px-4 "
                        type="text"
                        placeholder="name"
                    />
                    <input
                        required
                        name="price"
                        value={formStudent.price}
                        onChange={handleChange}
                        className="border bg-[#EDEFF2] border-slate-500 rounded-lg py-2 px-4 "
                        type="number"
                        placeholder="price"
                    />
                    <input
                        required
                        name="brand"
                        value={formStudent.brand}
                        onChange={handleChange}
                        className="border bg-[#EDEFF2] border-slate-500 rounded-lg py-2 px-4 "
                        type="text"
                        placeholder="brand"
                    />
                    <input
                        required
                        name="color"
                        value={formStudent.color}
                        onChange={handleChange}
                        className="border bg-[#EDEFF2] border-slate-500 rounded-lg py-2 px-4 "
                        type="color"
                        placeholder="color"
                    />
                    <input
                        required
                        name="releaseDate"
                        value={formStudent.releaseDate}
                        onChange={handleChange}
                        className="border bg-[#EDEFF2] border-slate-500 rounded-lg py-2 px-4 "
                        type="date"
                        placeholder="release date"
                    />
                    <input
                        required
                        name="power"
                        value={formStudent.power}
                        onChange={handleChange}
                        className="border bg-[#EDEFF2] border-slate-500 rounded-lg py-2 px-4 "
                        type="number"
                        placeholder="power"
                    />
                    <button className="border cursor-pointer hover:opacity-60 rounded-lg py-2 px-4 bg-[#7F4DFF] text-white">
                        {updateStudent ? "Save" : "Submit"}
                    </button>
                </form>
            </div>
            <div className='flex justify-between items-center mb-4'>
                <h2 className="text-xl">All Cars</h2>
                <button onClick={() => setStyle(!style)} className='p-3 rounded-lg bg-[#7F4DFF] flex justify-center items-center hover:opacity-60'>{style ? <Grid2x2 /> : <TableOfContents />}</button>
            </div>
            {
                style ? (
                    <div>
                        <table className="w-full text-black bg-[#EDEFF2] border border-gray-700 rounded-xl overflow-hidden">
                            <thead className="bg-[#EDEFF2] text-black">
                                <tr>
                                    <th className="py-3 px-6 text-left">#</th>
                                    <th className="py-3 px-6 text-left">Name</th>
                                    <th className="py-3 px-6 text-left">Price</th>
                                    <th className="py-3 px-6 text-left">Brand</th>
                                    <th className="py-3 px-6 text-left">Color</th>
                                    <th className="py-3 px-6 text-left">Release Date</th>
                                    <th className="py-3 px-6 text-left">Power</th>
                                    <th>Update</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            {
                                (isLoading || data.length == 0) ? <CarTableSkeleton /> : (
                                    <tbody>
                                        {
                                            (Array.isArray(data) ? data : []).map((car: ICar, index: number) => (
                                                <tr key={car.id} className="border-t hover:opacity-60">
                                                    <td className="py-3 px-6">{index + 1}</td>
                                                    <td className="py-3 px-6">{car.name}</td>
                                                    <td className="py-3 px-6">{car.price}</td>
                                                    <td className="py-3 px-6">{car.brand}</td>
                                                    <td className="py-3 px-6">{car.color}</td>
                                                    <td className="py-3 px-6">{car.releaseDate}</td>
                                                    <td className="py-3 px-6">{car.power}</td>
                                                    <td onClick={() => handleUpdate(car)} className="text-center"><button><SquarePen /></button></td>
                                                    <td onClick={() => handleDelete(car.id)} className="text-center"><button><Trash /></button></td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                )
                            }
                        </table>
                    </div>
                ) : (
                    <>
                        {
                            (isLoading || data.length == 0) ? <CarCardSkeleton /> : (
                                <div className="grid lg:grid-cols-5 md:grid-cols-3 gap-3">
                                    {
                                        (Array.isArray(data) ? data : []).map((car: ICar) => (
                                            <div key={car.id} className={`p-4 bg-[#EDEFF2] rounded-xl`}>
                                                <div className="text-center mt-4 text-black">
                                                    <h3 className="font-bold text-xl">{car.name}</h3>
                                                    <p className="my-2">{car.price}</p>
                                                    <p className="my-2">{car.brand}</p>
                                                    <p className="my-2">{car.color}</p>
                                                    <p className="my-2">{car.releaseDate}</p>
                                                    <p className="my-2">{car.power}</p>

                                                    <div className="flex gap-2 mt-4">
                                                        <button onClick={() => handleUpdate(car)} className="py-0.5 border rounded-lg text-sm flex-1 text-green-700 hover:bg-green-700 hover:text-white">
                                                            Update
                                                        </button>
                                                        <button onClick={() => handleDelete(car.id)} className="py-0.5 border rounded-lg text-sm flex-1 text-red-500 hover:bg-red-500 hover:text-white">
                                                            Delete
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            )
                        }
                    </>
                )
            }
        </div>
    )
}

export default React.memo(Cars)