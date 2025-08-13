import React from 'react'

const CardSkeleton = () => {
    return (
        <div className="grid lg:grid-cols-5 md:grid-cols-3 gap-3">
            {
                Array(10).fill(0).map((_, index) => (
                    <div key={index} className="p-4 bg-gray-300 rounded-xl">
                        <div className="relative">
                            <img
                                className="bg-white size-40 mx-auto rounded-full"
                                src={''}
                                alt=""
                            />
                        </div>
                        <div className="mt-4">
                            <h3 className="bg-white w-[90%] h-5"></h3>
                            <p className="bg-white w-[60%] h-3.5 my-5"></p>
                            <p className="bg-white w-[80%] h-3.5 my-5"></p>
                            <p className="bg-white w-[70%] h-3.5 my-5"></p>

                            <div className="flex gap-2 mt-4">
                                <button className="bg-white h-7 rounded-lg flex-1"></button>
                                <button className="bg-white h-7 rounded-lg flex-1"></button>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default React.memo(CardSkeleton)