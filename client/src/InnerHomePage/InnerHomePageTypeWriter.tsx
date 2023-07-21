
import { useState, useEffect } from 'react'
import { TypeWriterProps } from '../@types/typeWriter';

export default function InnerHomePageTypeWriter({ appendClass, roles, prefix }: TypeWriterProps) {
    // Outer container base class + append custom class
    let className = "flex flex-col gap-4";
    if (appendClass) className += " " + appendClass;

    // Typewriter effect base class
    const typeWriterClass = "font-bold border-b-2 border-b-cyan-400 border-r-2 pr-1"
        + "animate-cursor overflow-hidden whitespace-nowrap transition-[width] ease-in-out duration-1000 mr-auto";

    // State of current hat index
    const [currentRole, setCurrentRole] = useState(0);
    // State to toggle word collapse effect
    const [collapseClass, setCollapseClass] = useState("w-0");

    useEffect(() => {
        setTimeout(() => setCollapseClass("w-full"), 200);

        const incrementRole = async () => {
            // Set the width to 0 - transition duration is 1000ms
            setCollapseClass(" w-0");
            setTimeout(() => {
                /**
                 * After 1100ms, change the displayed text while the div
                 * is collapsed by incrementing the index
                 */
                setCurrentRole(oldVal => {
                    let roleIndex;
                    if (oldVal >= roles.length - 1) {
                        roleIndex = 0;
                    } else {
                        roleIndex = oldVal + 1;
                    }

                    return roleIndex;
                });
            }, 1100);
            // After 1000ms, set width to 100% - transition duration is 1000ms
            setTimeout(() => {
                setCollapseClass(" w-full");
            }, 1000);
        }
        // Interval timer to change text every 4000ms
        const id = setInterval(incrementRole, 3000);
        // Cleanup interval timer
        return () => clearInterval(id);
    }, []); //  eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className={className}>
            {/* <div className=" animate-bounce text-2xl md:text-6xl text-center mx-auto">
                Gregory <span className="text-accent font-bold">Foo</span>
            </div> */}
            <div className="flex gap-2 text-base md:text-4xl mx-auto">
                <div className="shrink-0 whitespace-nowrap ml-auto">
                    {prefix}
                    {roles[currentRole].prep ? ` ${roles[currentRole].prep} ` : ''}
                </div>
                <div className={`${typeWriterClass}${collapseClass}`}>{roles[currentRole].suffix}</div>
            </div>
        </div>
    )
}