import{ useState, useEffect } from 'react';

export default function Education(): JSX.Element {
  const [showFirstBubble, setShowFirstBubble] = useState<boolean>(false);
  const [showLoading, setShowLoading] = useState<boolean>(true);

  console.log("showLoading", showLoading)
  useEffect(() => {
      setShowFirstBubble(true);

    const secondBubbleTimer = setTimeout(() => {
      setShowLoading(false);
    }, 1000);

    return () => {
      clearTimeout(secondBubbleTimer);
    };

  }, []);

  return (
    <div className="flex flex-col gap-y-4">
      {showFirstBubble && (
        <div className="chat chat-end text-left">
          <div className="chat-header">You</div>
          <div className="chat-bubble bg-info">
            Could you tell me more about your <span className="font-bold text-neutral">education</span>?
          </div>
        </div>
      )}

      {showLoading && (
        <div className="flex">
          <div className="loading loading-dots loading-lg self-start"></div>
        </div>
      )}

      {!showLoading && showFirstBubble && (
        <div className="chat chat-start">
          <div className="chat-header">Gregory</div>
            <div className="chat-bubble bg-neutral my-4">
                <div className="card w-96 bg-base-100 shadow-xl">
                    <figure><img src="/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure>
                    <div className="card-body">
                        <h2 className="card-title">Shoes!</h2>
                        <p>If a dog chews shoes whose shoes does he choose?</p>
                        <div className="card-actions justify-end">
                        <button className="btn btn-primary">Buy Now</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      )}
    </div>
  );
}

