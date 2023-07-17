

export default function InnerHomePageWindow(): JSX.Element {
    return (
    <div className="mockup-window bg-base-300 overflow-y-scroll">
        <div className="flex flex-col justify-center px-4 py-16 bg-base-200 gap-4">   
        <div className="chat chat-start text-left">
            <div className="chat-header">
                Basic AI
            </div>
            <div className="chat-bubble bg-info">Tell me about yourself, Greg...</div>
            </div>
            <div className="chat chat-end">
            <div className="chat-header">
                Gregory
            </div>
            <div className="chat-bubble bg-neutral text-justify">I am a driven and hardworking individual who strives to attain as much knowledge as possible and possesses the dedication to lifelong learning. My career journey started off as an aerospace engineer, amassing a few years worth of aviation experience, armed with people management skillsets and deep technical expertise for a large organization (Republic of Singapore Air Force). 

In 2022, I decided to pursue my unearthed passion, which is developing software applications and machine learning products for the betterment of our daily lives through technology. Boundaries were pushed and here I am, within the Tech arm of RSAF, RAiD. Equipped with an arsenal of software skills (e.g Full-Stack Development using Javascript) with a substantial technical repository, I am looking to enhance the current processes of the RSAF and aspire to create a marriage between aviation, software development and machine learning/AI.</div>
            </div>
        </div> 
    </div>
    )
}
