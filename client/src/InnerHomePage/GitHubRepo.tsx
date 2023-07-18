
export default function GitHubRepo(): JSX.Element {


    return  (
        <div className="flex flex-col gap-y-4 ">
            <div className="chat chat-start text-left" >
                <div className="chat-header">
                    Basic AI
                </div>
                <div className="chat-bubble bg-info">
                    Any <span className="font-bold text-neutral">technical projects</span> that you've done?
                </div>
                </div>
                <div className="chat chat-end">
                <div className="chat-header">
                    Gregory
                </div>
                <div className="chat-bubble bg-neutral text-left">
                    Kindly refer to {' '}
                    <a className="link link-hover link-success" href="https://github.com/gregoryfoo95" target="_blank" rel="noopener noreferrer">
                        Gregory's GitHub 
                    </a>
                    {' '} and see below for direct links.
                </div>
                <div className="chat-header">
                    Gregory
                </div>
                <div className="chat-bubble bg-neutral text-left my-4">
                    <div className="join join-vertical">
                        <button className="btn join-item bg-cyan-950">
                            <a href="https://github.com/gregoryfoo95/LSS-currency-ts" target="_blank" rel="noopener noreferrer"> 
                                RSAF - Currency Tracking (Typescript, React, Express, PostgreSQL/SQL Server)
                            </a>
                        </button>
                        <button className="btn join-item bg-sky-700">
                            <a href="https://github.com/gregoryfoo95/MERN_Pharmacy_App_Better_Life" target="_blank" rel="noopener noreferrer"> 
                                BetterLife - Pharmacy App (Javascript, React, Express, MongoDB)
                            </a>
                        </button>
                        <button className="btn join-item bg-purple-700">
                            <a href="https://github.com/gregoryfoo95/SaveLah" target="_blank" rel="noopener noreferrer"> 
                            SaveLah - Budgeting and Expense Tracking App (Javascript, Express, MongoDB, EJS)
                            </a>
                        </button>
                        <button className="btn join-item bg-teal-800">
                            <a href="https://github.com/gregoryfoo95/Eeveelution" target="_blank" rel="noopener noreferrer"> 
                                Eeveelution - 2048-inspired Game (Javascript, HTML, CSS)
                            </a>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

