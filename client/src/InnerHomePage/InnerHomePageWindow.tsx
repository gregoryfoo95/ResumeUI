import AboutMeText from "./AboutMeText"
import GitHubRepo from "./GitHubRepo"
export default function InnerHomePageWindow(): JSX.Element {
    return (
    <div className="mockup-window bg-base-300 overflow-y-scroll">
        <div className="flex flex-col justify-center px-4 py-16 bg-base-200 gap-4 lg:text-lg sm:text-xs ">   
            <AboutMeText/>
            <GitHubRepo/>
        </div> 
    </div>
    )
}
