import{ useState, useEffect } from 'react';

export default function ConvoStarter(): JSX.Element {


  return (
    <div className="chat chat-start text-left">
          <div className="chat-header">Gregory</div>
          <div className="chat-bubble bg-background">
            Feel free to ask me anything!
          </div>
        </div>
  );
}

