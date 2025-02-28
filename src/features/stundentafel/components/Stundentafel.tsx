import {CalendarIcon, ChevronLeftIcon, ChevronRightIcon, PlusIcon} from '@heroicons/react/24/solid';
import useIsMobile from "../../shared/hooks/useIsMobile.ts";

const Stundentafel = () => {
    const isMobile = useIsMobile();
    const captureButtonContent = isMobile ? <PlusIcon className="h-5 w-8"/> : "+ Erfassen";

    return (
        <>
            <div className="p-2 border-b border-b-gray-300 bg-white">
                <h1 className="text-2xl text-indigo-900 font-bold">Stundentafel</h1>
            </div>
            <div className="flex justify-between items-center mx-5 mt-7">
                <div className="inline-flex rounded-b-sm border border-gray-300">
                    <button className="px-4 py-2 bg-white text-gray-800 font-medium text-sm hover:bg-indigo-100">
                        Heute
                    </button>
                    {!isMobile ? (
                        <>
                            <div className="border-l border-gray-200"></div>
                            <button className="px-2 py-2 bg-white text-gray-600 hover:bg-indigo-100">
                                {<CalendarIcon className="h-5 w-5"/>}
                            </button>
                        </>
                    ) : null}
                </div>
                <div className="inline-flex items-center">
                    <button className="p-1 hover:bg-indigo-100 rounded-full transition-colors">
                        <ChevronLeftIcon className="h-5 w-5"/>
                    </button>
                    <div className="font-medium text-lg mx-2">
                        <span className="text-indigo-900">Feb 2025</span>
                        <span className="text-gray-400">/ KW45</span>
                    </div>
                    <button className="p-1 hover:bg-indigo-100 rounded-full transition-colors">
                        <ChevronRightIcon className="h-5 w-5"/>
                    </button>
                </div>
                <button
                    className="px-4 py-2 bg-indigo-900 text-white font-medium text-sm hover:bg-indigo-600 rounded-md border border-indigo-900">
                    {captureButtonContent}
                </button>
            </div>
        </>
    )
}

export default Stundentafel
