// import Head from 'next/head'
import Image from "next/image";
import React, { useState, useEffect } from "react";
import Data from "./Api/cars-data.json";

const Home = () => {
    const [step, setStep] = useState(0);
    const [Sport, setSport] = useState(false);
    const [budget, setBudget] = useState(0);
    const [order, setOrder] = useState([]);
    const [selected, setSelected] = useState(0);
    const [orderedObject, setOrderedObject] = useState([]);

    const fuelEf = Data.filter((item) => {
        if (Sport === true) {
            return item.Vehicle_type === "Passenger" && item.Horsepower >= 250;
        } else {
            return item.Fuel_efficiency > 26;
        }
    });

    const getPrice = fuelEf.filter((item) => item.Price_in_thousands <= budget);

    const submitMiles = () => {
        setSelected(0);
        setStep(3);
    };

    const handleChange = (e) => {
        setBudget(e.target.value);
        console.log(budget);
    };

    const fuelArray = getPrice.map((item) => item.Fuel_efficiency);
    const HorsepowerArray = getPrice.map((item) => item.Horsepower);
    const PriceArray = getPrice.map((item) => item.Price_in_thousands);

    const countSort = (inputData) => {
        let node = inputData.length;
        let kule = Math.max(...inputData);

        let type;
        //Create a temporary with 0 zero value
        //as the same length of max elemet + 1
        const temp = new Array(kule + 1).fill(0);

        //Count the frequency of each element in the original array
        //And store it in temp array
        for (let i = 0; i < node; i++) {
            type = inputData[i];
            temp[type]++;
        }

        //Update the count based on the previous index
        for (let i = 1; i <= kule; i++) {
            // Updating elements of count array
            temp[i] = temp[i] + temp[i - 1];
        }

        //Output arr
        const outputArr = new Array(node).fill(0);

        for (let i = node - 1; i >= 0; i--) {
            // Add elements of array A to array B
            type = inputData[i];
            outputArr[temp[type] - 1] = type;

            // Decrement the count value by 1
            temp[type] = temp[type] - 1;
        }
        return setOrder(outputArr);
    };

    const mapOrder = (objectArray, order, key) => {
        console.log(order);
        objectArray.sort((a, b) => {
            var A = a[key],
                B = b[key];

            if (order.indexOf(A) < order.indexOf(B)) {
                return 1;
            } else {
                return -1;
            }
        });

        return objectArray;
    };

    useEffect(() => {
        switch (selected) {
            case 1:
                setOrderedObject(mapOrder(getPrice, order, "Fuel_efficiency"));
                break;
            case 2:
                setOrderedObject(mapOrder(getPrice, order, "Horsepower"));
                break;
            case 3:
                setOrderedObject(
                    mapOrder(getPrice, order, "Price_in_thousands")
                );
                break;
            default:
                setOrderedObject(mapOrder(getPrice, order, "Manufacturer"));
        }
    }, [selected]);

    const showList = () => {
        return orderedObject.map((item, index) => {
            return (
                <div
                    key={index}
                    class='card lg:card-side bg-base-100 shadow-xl w-11/12 xl:w-3/5 my-4'
                >
                    <figure className='px-10'>
                        <Image
                            src={`/images/${item.Manufacturer.toLowerCase()}.png`}
                            layout='intrinsic'
                            height={200}
                            width={200}
                        />
                    </figure>
                    <div class='card-body text-left text-black p-10'>
                        <h2 className='card-title text-4xl'>
                            {item.Manufacturer} {item.Model}
                        </h2>
                        <div className='text-2xl'>
                            Horsepower: {item.Horsepower}
                        </div>
                        <div className='text-2xl'>
                            Fuel Efficiency: {item.Fuel_efficiency}
                        </div>
                        <div class='card-actions justify-end'>
                            <div class='btn px-6 rounded-lg text-3xl'>
                                $
                                {item.Price_in_thousands.toLocaleString(
                                    "en-US"
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            );
        });
    };

    switch (step) {
        case 1:
            return (
                <div className='text-white'>
                    <div className='flex flex-col items-center justify-center font-fred h-screen text-center bg-gradient-to-r from-cyan-400 to-blue-600'>
                        <h1 className='text-5xl font-semibold'>
                            What type of car are you looking for?
                        </h1>
                        <div className='flex gap-4 mt-8 text-left'>
                            <button
                                className='btn btn-primary px-10 py-32 mt-4 bg-white text-black text-2xl rounded-lg'
                                onClick={() => {
                                    setStep(2);
                                    setSport(true);
                                    console.log(Sport);
                                }}
                            >
                                Weekend Sports Car
                            </button>
                            <button
                                className='btn btn-primary px-10 py-32 mt-4 bg-white text-black text-2xl rounded-lg'
                                onClick={() => {
                                    setStep(2);
                                    setSport(false);
                                    console.log(Sport);
                                }}
                            >
                                Daily Commuter Car
                            </button>
                        </div>
                        <button
                            className='btn btn-primary px-12 py-2 mt-10 bg-white text-black rounded-lg'
                            onClick={() => setStep(0)}
                        >
                            Back
                        </button>
                    </div>
                </div>
            );
        case 2:
            return (
                <div className='text-white'>
                    <div className='flex flex-col items-center justify-center font-fred h-screen text-center bg-gradient-to-r from-cyan-400 to-blue-600'>
                        <h1 className='text-5xl font-semibold'>
                            What is your budget to purchase a new car?
                        </h1>
                        <form
                            className='flex flex-col mt-4 text-left mt-12'
                            onSubmit={submitMiles}
                        >
                            <label className='text-xl'>Price</label>
                            <input
                                type='number'
                                placeholder=''
                                className='rounded-md px-2 py-1 text-black'
                                onChange={handleChange}
                            />
                            <div className='flex flex-row-reverse gap-10 justify-around mt-12'>
                                <button
                                    className='btn btn-primary w-36 py-2 bg-white text-black rounded-lg'
                                    type='submit'
                                >
                                    next
                                </button>
                                <button
                                    className='btn btn-primary w-36 py-2 bg-white text-black rounded-lg'
                                    onClick={() => setStep(1)}
                                >
                                    Back
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            );
        case 3: {
            return (
                <div className='bg-gradient-to-r from-cyan-400 to-blue-600 h-auto'>
                    <div className='text-white'>
                        <div className='flex flex-col items-center justify-center font-fred text-center '>
                            <div className='flex flex-col md:flex-row my-10 w-11/12 justify-center items-center md:justify-between xl:w-3/5 gap-4'>
                                <button
                                    className='btn btn-primary px-10'
                                    onClick={() => setStep(1)}
                                >
                                    Start Over
                                </button>
                                <div class='btn-group'>
                                    <input
                                        type='radio'
                                        name='options'
                                        data-title='Fuel Efficiency'
                                        class='btn w-44'
                                        onClick={() => {
                                            countSort(fuelArray);
                                            setSelected(1);
                                        }}
                                    />
                                    <input
                                        type='radio'
                                        name='options'
                                        data-title='Horsepower'
                                        class='btn w-44'
                                        onClick={() => {
                                            countSort(HorsepowerArray);
                                            setSelected(2);
                                        }}
                                        chec
                                    />
                                    <input
                                        type='radio'
                                        name='options'
                                        data-title='Price'
                                        class='btn w-44'
                                        onClick={() => {
                                            countSort(PriceArray);
                                            setSelected(3);
                                        }}
                                    />
                                </div>
                            </div>
                            {selected === 0
                                ? getPrice.map((item, index) => {
                                      return (
                                          <div
                                              key={index}
                                              class='card lg:card-side bg-base-100 shadow-xl w-11/12 xl:w-3/5 my-4'
                                          >
                                              <figure className='px-10'>
                                                  <Image
                                                      src={`/images/${item.Manufacturer.toLowerCase()}.png`}
                                                      layout='intrinsic'
                                                      height={200}
                                                      width={200}
                                                  />
                                              </figure>
                                              <div class='card-body text-left text-black p-10'>
                                                  <h2 className='card-title text-4xl'>
                                                      {item.Manufacturer}{" "}
                                                      {item.Model}
                                                  </h2>
                                                  <div className='text-2xl'>
                                                      Horsepower:{" "}
                                                      {item.Horsepower}
                                                  </div>
                                                  <div className='text-2xl'>
                                                      Fuel Efficiency:{" "}
                                                      {item.Fuel_efficiency}
                                                  </div>
                                                  <div class='card-actions justify-end'>
                                                      <div class='btn px-6 rounded-lg text-3xl'>
                                                          $
                                                          {item.Price_in_thousands.toLocaleString(
                                                              "en-US"
                                                          )}
                                                      </div>
                                                  </div>
                                              </div>
                                          </div>
                                      );
                                  })
                                : showList()}
                        </div>
                    </div>
                </div>
            );
        }
        default:
            return (
                <div className='text-white'>
                    <div className='flex flex-col items-center justify-center font-fred h-screen text-center bg-gradient-to-r from-cyan-400 to-blue-600'>
                        <h1 className='text-5xl font-semibold w-3/4'>
                            Sorting cars
                        </h1>
                        <h3 className='text-3xl'>
                            Data sorting with count sort algorithm
                        </h3>
                        <button
                            className='btn btn-primary px-12 py-2 mt-10 rounded-lg'
                            onClick={() => setStep(1)}
                        >
                            Get Started
                        </button>
                    </div>
                </div>
            );
    }
};;

export default Home;
