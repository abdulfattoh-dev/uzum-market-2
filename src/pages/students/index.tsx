import React, { useEffect, useState, type FormEvent } from 'react'
import type { IData } from '../../types'
import axios from 'axios'
import TableSkeleton from '../../components/ui/TableSkeleton'
import CardSkeleton from '../../components/ui/CardSkeleton'
import { Grid2x2, SquarePen, TableOfContents, Trash } from 'lucide-react';

const BASE_URL = 'https://689c680e58a27b18087e0a95.mockapi.io/students'

const initialState: IData = {
    name: '',
    birthdate: '',
    address: '',
    email: ''
}

const Students = () => {
    const [data, setData] = useState<IData[]>([])
    const [formStudent, setFormStudent] = useState<IData>(initialState)
    const [reload, setReload] = useState<boolean>(true)
    const [updateStudent, setUpdateStudent] = useState<IData | null>(null)

    useEffect(() => {
        axios
            .get(BASE_URL)
            .then((res) => setData(res.data))
    }, [reload])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { value, name } = e.target;
        setFormStudent((p) => ({ ...p, [name]: value }));
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (updateStudent) {
            axios
                .put(`${BASE_URL}/${formStudent.id}`, formStudent)
                .then(() => setReload(p => !p))

            setUpdateStudent(null);
        } else {
            axios
                .post(BASE_URL, formStudent)
                .then(() => setReload(p => !p))
        }

        setFormStudent(initialState)
    };

    const handleDelete = (id: number) => {
        if (updateStudent?.id == id) {
            setFormStudent(initialState)
            setUpdateStudent(null)
        }

        axios
            .delete(`${BASE_URL}/${id}`)
            .then(() => setReload(p => !p))
    }

    const handleUpdate = (student: IData) => {
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
                <h2 className="text-xl mb-4">Create Student</h2>
                <form onSubmit={handleSubmit} className="grid md:grid-cols-1 gap-4 " action="">
                    <input
                        required
                        name="name"
                        value={formStudent.name}
                        onChange={handleChange}
                        className="border bg-[#EDEFF2] border-slate-500 rounded-lg py-2 px-4 "
                        type="text"
                        placeholder="full name"
                    />
                    <input
                        required
                        name="birthdate"
                        value={formStudent.birthdate}
                        onChange={handleChange}
                        className="border bg-[#EDEFF2] border-slate-500 rounded-lg py-2 px-4 "
                        type="date"
                        placeholder="birthdate"
                    />
                    <input
                        required
                        name="address"
                        value={formStudent.address}
                        onChange={handleChange}
                        className="border bg-[#EDEFF2] border-slate-500 rounded-lg py-2 px-4 "
                        type="text"
                        placeholder="address"
                    />
                    <input
                        required
                        name="email"
                        value={formStudent.email}
                        onChange={handleChange}
                        className="border bg-[#EDEFF2] border-slate-500 rounded-lg py-2 px-4 "
                        type="email"
                        placeholder="email"
                    />
                    <button className="border cursor-pointer hover:opacity-60 rounded-lg py-2 px-4 bg-[#7F4DFF] text-white">
                        {updateStudent ? "Save" : "Submit"}
                    </button>
                </form>
            </div>
            <div className='flex justify-between items-center mb-4'>
                <h2 className="text-xl">All Students</h2>
                <button onClick={() => setStyle(!style)} className='p-3 rounded-lg bg-[#7F4DFF] flex justify-center items-center hover:opacity-60'>{style ? <Grid2x2 /> : <TableOfContents />}</button>
            </div>
            {
                style ? (
                    <div>
                        <table className="w-full text-black bg-[#EDEFF2] border border-gray-700 rounded-xl overflow-hidden">
                            <thead className="bg-[#EDEFF2] text-black">
                                <tr>
                                    <th className="py-3 px-6 text-left">#</th>
                                    <th className="py-3 px-6 text-left">Full Name</th>
                                    <th className="py-3 px-6 text-left">Birth Date</th>
                                    <th className="py-3 px-6 text-left">Address</th>
                                    <th className="py-3 px-6 text-left">Email</th>
                                    <th>Update</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            {
                                data.length == 0 ? <TableSkeleton /> : (
                                    <tbody>
                                        {
                                            data?.map((student, index) => (
                                                <tr key={index} className="border-t hover:opacity-60">
                                                    <td className="py-3 px-6">{index + 1}</td>
                                                    <td className="py-3 px-6">{student.name}</td>
                                                    <td className="py-3 px-6">{student.birthdate}</td>
                                                    <td className="py-3 px-6">{student.address}</td>
                                                    <td className="py-3 px-6">{student.email}</td>
                                                    <td onClick={() => handleUpdate(student)} className="text-center"><button><SquarePen /></button></td>
                                                    <td onClick={() => handleDelete(student.id as number)} className="text-center"><button><Trash /></button></td>
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
                            data.length == 0 ? <CardSkeleton /> : (
                                <div className="grid lg:grid-cols-5 md:grid-cols-3 gap-3">
                                    {
                                        data?.map((student, index) => (
                                            <div key={index} className="p-4 bg-[#EDEFF2] rounded-xl">
                                                <div className="relative">
                                                    <img
                                                        className="size-40 object-cover mx-auto rounded-full"
                                                        src={student.image}
                                                        alt=""
                                                    />
                                                </div>
                                                <div className="text-center mt-4 text-black">
                                                    <h3 className="font-bold text-xl">{student.name}</h3>
                                                    <p className="my-2">{student.birthdate}</p>
                                                    <p className="my-2">{student.address}</p>
                                                    <p className="my-2">{student.email}</p>

                                                    <div className="flex gap-2 mt-4">
                                                        <button onClick={() => handleUpdate(student)} className="py-0.5 border rounded-lg text-sm flex-1 text-green-700 hover:bg-green-700 hover:text-white">
                                                            Update
                                                        </button>
                                                        <button onClick={() => handleDelete(student.id as number)} className="py-0.5 border rounded-lg text-sm flex-1 text-red-500 hover:bg-red-500 hover:text-white">
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

export default React.memo(Students)