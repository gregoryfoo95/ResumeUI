import RefreshIcon from "../assets/icons/RefreshIcon.svg";

type RefreshChatWindowProps = {
    handleRefresh: () => void;
  };

export default function RefreshChatWindow({ handleRefresh }: RefreshChatWindowProps): JSX.Element {
 return (
    <div
      className="flex items-center mx-auto badge badge-outline border-info w-30 h-8 px-4 bg-info text-white cursor-pointer text-xs md:text-sm"
      onClick={handleRefresh}
    >
    <figure className="w-4 h-4 mr-2">
        <img src={RefreshIcon} alt="Refresh"/>
    </figure>
        Refresh Chat
    </div>
  )
}
