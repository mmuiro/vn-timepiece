import React from "react";
import Button from "../components/Buttons/Button";

export default function LandingPage() {
    return(<div className="bg-gradient-to-r from-rose-500 to-pink-500 min-h-screen flex justify-center pt-[5vh]">
        <div className="flex flex-col py-8 px-8 items-center w-[44rem] subpixel-antialiased">
            <span className="text-white text-5xl font-semibold leading-normal">VN Timepiece</span>
            <span className="text-pink-100 font-semibold text-xl leading-normal text-center">Visual Novel Timepiece is an <a href="https://github.com/mmuiro/vn-timepiece" className="transition text-pink-700 hover:text-red-200 no-underline">open-source</a> site for helping you track your visual novel reading times and reading history, all in one place.</span>
            <span className="text-white text-2xl font-semibold mb-6 mt-20">Get Started</span>
            <div className="flex items-center justify-center">
                <Button linkTo={"/login"} size="w-24 h-10 mx-2" bg="bg-gradient-to-br from-pink-600 to-rose-600">
                    <span className="text-lg font-semibold text-white">Login</span>
                </Button>
                <Button linkTo={"/register"} size="w-48 h-10 mx-2" bg="bg-white" shadow="bg-gray-300">
                    <span className="text-lg font-semibold text-neutral-800">Create an Account</span>
                </Button>
            </div>
        </div>
    </div>);
}