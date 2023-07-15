import AboutMeButton from "../AboutMePage/AboutMeButton"

export default function InnerHomePageWindow(): JSX.Element {
    return (
    <div className="mockup-window bg-base-300 static">
        <div className="flex flex-row justify-center px-4 py-16 bg-base-200">   
        <div className="absolute top-40 left-20 mt-4 ml-4 md:mt-16 md:ml-8 lg:mt-16 lg:ml-80">
          <div className="">
            <AboutMeButton />
          </div>
        </div>   
        </div> 
    </div>
    )
}
