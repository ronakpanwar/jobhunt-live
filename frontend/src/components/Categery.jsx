import React from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { Button } from './ui/button'

const category = [
    "Frontend Developer",
    "Backend Developer",
    "Data Science",
    "Graphic designer",
    "MERN Stack Developer"
]

const Categery = () => {


    return (
        <div>
            <Carousel className=" w-full max-w-4xl mx-auto my-20 relative">
                <CarouselContent className="flex gap-4 px-4 py-6">
                    {
                        category.map((c, index) => (
                            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 p-2">
                                <Button className="w-full bg-violet-500 text-white rounded-lg shadow-md hover:bg-violet-600 transition duration-300">
                                    {c}
                                </Button>
                            </CarouselItem>
                        ))
                    }
                </CarouselContent>
                <CarouselNext className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full cursor-pointer hover:bg-gray-700 transition duration-300" />
                <CarouselPrevious className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full cursor-pointer hover:bg-gray-700 transition duration-300" />
            </Carousel>
        </div>

    )   
}

export default Categery
