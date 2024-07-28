import ReviewCard from "../common/ReviewCard";

export default function Reviews(){

const REVIEWS_DATA = [
    {
        id: '1',
        image: '/reviewer.jpg',
        name: 'Hannah Nelson',
        timestamp: "24 Aug 2023, 10:45 am",
        content: "I recently purchased the headphones and couldn't be happier with my decision! From the moment I unboxed it, I was impressed by the sleek design and high-quality materials. It's clear that a lot of thought and care went into every detail."
    },
    {
        id: '2',
        image: '/reviewer.jpg',
        name: 'Hannah Nelson',
        timestamp: "24 Aug 2023, 10:45 am",
        content: "I recently purchased the headphones and couldn't be happier with my decision! From the moment I unboxed it, I was impressed by the sleek design and high-quality materials. It's clear that a lot of thought and care went into every detail."
    },
    {
        id: '3',
        image: '/reviewer.jpg',
        name: 'Hannah Nelson',
        timestamp: "24 Aug 2023, 10:45 am",
        content: "I recently purchased the headphones and couldn't be happier with my decision! From the moment I unboxed it, I was impressed by the sleek design and high-quality materials. It's clear that a lot of thought and care went into every detail."
    },
]


    return(
        <div className="text-center w-full flex justify-center items-center flex-col my-8 gap-8 p-12">
        <h1 className="divider text-2xl sm:text-3xl font-normal">Happy Customers</h1>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 py-4">
        {
                REVIEWS_DATA.map((item) => 
                    <ReviewCard 
                    key={item.id}
                    Name={item.name}
                    TimeStamp={item.timestamp}
                    Content={item.content}
                    Image={item.image}
                    />
                )
            }
        </div>
    </div>
    )
}