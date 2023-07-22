import InnerHomePageTypeWriter from "./InnerHomePageTypeWriter"
import role from "../@classes/role";

export default function InfoBar(): JSX.Element {
    const roles = [
        new role('a', 'Full Stack Web Developer'),
        new role('an', "Aerospace Engineer"),
        new role('a', "RAiDer")
      ];

    return (
        <div className="stats stats-vertical lg:stats-horizontal flex-col lg:flex-row gap-x-4 shadow ">
        
        <div className="stat flex-1 min-w-0">
          <div className="stat-figure text-secondary">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <div className="stat-title font-bold text-xl">Name</div>
          <div className="stat-value text-2xl text-accent animate-pulse ">Gregory Foo</div>
        </div>

        <div className="stat flex-2 flex-col justify-items-center">
          <div className="stat-figure text-secondary ">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
            </svg>
          </div>
          <div className="stat-title font-bold text-xl">Current Role</div>
          {/* <div className="stat-value text-2xl text-accent animate-pulse">Software Engineer</div> */}
          <div className="min-w-0 lg:w-[500px] ">
            <InnerHomePageTypeWriter appendClass="" roles={roles} prefix="" />
          </div>
          <br></br>
          <div className="stat-desc text-success">@RAiD/DSTA</div>
        </div>
        
        <div className="stat flex-1 min-w-0">
          <div className="stat-figure text-secondary">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
          </svg>
          </div>
          <div className="stat-title font-bold text-xl">Email</div>
          <div className="stat-value text-lg">gregoryfoo@hotmail.com</div>
        </div>
        
      </div>
    )
}
