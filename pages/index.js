// import Head from 'next/head'
// import Image from 'next/image'
// import styles from '../styles/Home.module.css'

const Home = () => {
    return (
        <div className='text-white'>
            <div className='flex flex-col items-center justify-center font-fred h-screen text-center bg-gradient-to-r from-cyan-400 to-blue-600'>
                <h1 className='text-5xl font-semibold'>
                    Find The Car That's Right For You
                </h1>
                <h3 className='text-3xl'>
                    Data sorting with count sort algorithm
                </h3>
                <button className='px-4 py-2 mt-4 bg-white text-black rounded-lg '>
                    Get Started
                </button>
            </div>
        </div>
    );
};

export default Home;
