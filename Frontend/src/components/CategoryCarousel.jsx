import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../../@/components/ui/carousel'
import { Button } from './ui/button'

const category = [
    "Frontend Developer",
    "Backend Developer",
    "Data Analyst",
    "Requirement Eng",
    "Graphic Designter"
]

const CategoryCarousel = () => {
    return (
        <div className="w-full max-w-2xl mx-auto my-10">
            <Carousel className="flex items-center justify-center">
                <CarouselContent className="flex items-center space-x-4">
                    {
                        category.map((cat, index) => (
                            <CarouselItem className="ml-4 pl-4 md:basis-1/2 lg:basis-1/3">
                                <Button variant="outline" className="rounded-full">{cat}</Button>
                            </CarouselItem>
                        ))
                    }
                </CarouselContent>
                
            </Carousel>
        </div>
    )
}

export default CategoryCarousel