import {CalendarIcon} from '@heroicons/react/24/solid';

const Stundentafel = () => {
    return (
        <>
            <div className="p-2 border-b border-b-gray-300 bg-white">
                <h1 className="text-2xl text-indigo-900 font-bold">Stundentafel</h1>
            </div>
            <div className="flex justify-between items-center mx-5 mt-7">
                <div className="inline-flex rounded-md border border-gray-200">
                    <button className="px-4 py-2 bg-white text-gray-800 font-medium text-sm hover:bg-gray-50">
                        Heute
                    </button>
                    <div className="border-l border-gray-200"></div>
                    <button className="px-2 py-2 bg-white text-gray-600 hover:bg-gray-50">
                        {<CalendarIcon className="h-5 w-5"/>}
                    </button>
                </div>
                <button
                    className="px-4 py-2 bg-indigo-900 text-white font-medium text-sm hover:bg-indigo-800 rounded-md border border-indigo-900">
                    + Erfassen
                </button>
            </div>
        </>
    )
}

export default Stundentafel
