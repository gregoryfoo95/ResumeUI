import TypedText from "../../components/TypedText";

export default function ConvoStarter(): JSX.Element {
  return (
    <div className="chat chat-start text-left">
      <div className="chat-header py-3 text-sm font-extrabold md:text-xl">Gregory</div>
      <div className="chat-bubble bg-neutral text-sm md:text-lg">
        <TypedText text="Hi, I'm Greg. Ask me anything, or pick a topic from the dock below." />
      </div>
    </div>
  );
}
